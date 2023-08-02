import { Button, Group, Stack, Text } from "@mantine/core";
import { v4 as uuidv4 } from "uuid";
import ReactFlow, {
  Background,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  MarkerType,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from "reactflow";
import ResizableNodeSelected from "./ResizableNodeSelected";
import ResizableGroupNodeSelected from "./ResizableGroupNodeSelected";

import "reactflow/dist/style.css";
import "../../Flow.css";

import { useCallback, useState } from "react";
import { UpdateNodo } from "./UpdateNodo";
import { UpdateEdge } from "./UpdateEdge";
import { useWindowSize } from "../../hook";

const nodeTypes = { ResizableNodeSelected, ResizableGroupNodeSelected };

function Flow() {
  const wsize = useWindowSize();
  // const dragRef = useRef(null);
  // const [target, setTarget] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [groups, setGroups] = useState([]);

  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  const [openNodeDialog, setOpenNodeDialog] = useState(false);
  const [openEdgeDialog, setOpenEdgeDialog] = useState(false);

  const updateNodeMetadata = (id, label) => {
    const ret = nodes.map((n) => {
      if (n.id === id) {
        n.data.label = label;
      }
      return n;
    });

    setNodes(ret);
  };

  const updateEdgeMetadata = (id, label) => {
    const ret = edges.map((e) => {
      if (e.id === id) {
        e.label = label;
      }
      return e;
    });

    setEdges(ret);
  };

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
      setSelectedNode(null);
    },
    [setEdges, edges, nodes]
  );

  const onNodeDoubleClick = (env, node) => {
    setSelectedNode(node);
    setOpenNodeDialog(true);
  };

  const onEdgeDoubleClick = (env, edge) => {
    setSelectedEdge(edge);
    setOpenEdgeDialog(true);
  };

  const addState = () => {
    const node = {
      id: uuidv4(),
      type: "ResizableNodeSelected",
      className: "state",
      position: { x: 0, y: 0 },
      data: { label: "Estado" },
      parentNode: null
    };
    setNodes([...nodes, node]);
  };

  const addTransition = () => {
    const node = {
      id: uuidv4(),
      type: "ResizableNodeSelected",
      className: "transition",
      position: { x: 0, y: 0 },
      data: { label: "Transicion" },
      parentNode: null
    };
    setNodes([...nodes, node]);
  };

  const addGroup = () => {
    const node = {
      id: uuidv4(),
      type: "ResizableGroupNodeSelected",
      className: "group",
      connectable: false,
      data: { label: "Group", container:true},
      position: { x: 10, y: 10 },
    };
    setNodes([...nodes, node]);
    setGroups([...groups, node]);
  };

  const onConnect = (params) => {
    //setEdges((eds) => addEdge(params, eds));
    const edge = {
      id: uuidv4(),
      type: 'smoothstep',
      source: params.source,
      target: params.target,
      label: "Conector",
      updatable: "target",
      markerEnd: { type: MarkerType.ArrowClosed },
    };

    setEdges([...edges, edge]);
  };

  // const onNodeDragStart = (evt, node) => {
  //   dragRef.current = node;
  // };

  // const onNodeDrag = (evt, node) => {
  //   // calculate the center point of the node from position and dimensions
  //   const centerX = node.position.x + node.width / 2;
  //   const centerY = node.position.y + node.height / 2;

  //   // find a node where the center point is inside
  //   const targetNode = nodes.find(
  //     (n) =>
  //       centerX > n.position.x &&
  //       centerX < n.position.x + n.width &&
  //       centerY > n.position.y &&
  //       centerY < n.position.y + n.height &&
  //       n.id !== node.id // this is needed, otherwise we would always find the dragged node
  //   );

  //   setTarget(targetNode);
  // };

  // const onNodeDragStop = (evt, node) => {
  //   const nodeObj = node.data;
  //   const targetObj = target?.data;
  //   let targetId = null;

  //   if(targetObj?.container){
  //     console.log("nodeLabel:" , nodeObj.label, " targetLabel:", targetObj.label);
  //     targetId = target.id;
  //   }

  //   const ret = nodes.map((n) => {
  //     if (n.id === node.id) {
  //       n.parentNode = targetId;
  //     }
  //     return n;
  //   });

  //   setNodes(ret);

  //   setTarget(null);
  //   dragRef.current = null;
  // };

  return (
    <Stack w={wsize.width} h={wsize.height} spacing={"xs"}>
      <Group position="left" p={0} m={"xs"}>
        <Button size="xs" onClick={addGroup}>
          <Text>Grupo</Text>
        </Button>
        <Button size="xs" onClick={addState}>
          <Text>Estado</Text>
        </Button>
        <Button size="xs" onClick={addTransition}>
          <Text>Transicion</Text>
        </Button>
      </Group>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        onNodeDoubleClick={onNodeDoubleClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        // onNodeDragStart={onNodeDragStart}
        // onNodeDrag={onNodeDrag}
        // onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
      >
        <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
      </ReactFlow>

      <UpdateNodo
        node={selectedNode}
        open={selectedNode && openNodeDialog}
        setOpen={setOpenNodeDialog}
        updateNodeMetadata={updateNodeMetadata}
      />

      <UpdateEdge
        edge={selectedEdge}
        open={selectedEdge && openEdgeDialog}
        setOpen={setOpenEdgeDialog}
        updateEdgeMetadata={updateEdgeMetadata}
      />
    </Stack>
  );
}

export default Flow;
