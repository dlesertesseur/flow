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
// import ResizableNodeSelected from "./ResizableNodeSelected";

import "reactflow/dist/style.css";
import "../../Flow.css";
import { useCallback, useState } from "react";
import { UpdateNodo } from "./UpdateNodo";

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [open, setOpen] = useState(false);

  const updateNodeMetadata = (id, label) => {
    console.log("updateNodeMetadata", id, label);
    const ret = nodes.map((n) => {
        if(n.id === id){
            n.data.label = label;
        }
        return(n);
    })

    setNodes(ret);
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
      selectedNode(null);
    },
    [setEdges, edges, selectedNode, nodes]
  );

  const onNodeDoubleClick = (env, node) => {
    setSelectedNode(node);
    setOpen(true);
  };

  const onEdgeDoubleClick = (env, edge) => {
    console.log("onEdgeDoubleClick env -> ", edge);
  };

  const onNodeDragStop = (env, node) => {
    console.log("onNodeDragStop env -> ", node);
  };

  const addState = () => {
    const node = {
      id: uuidv4(),
      //type: "ResizableNodeSelected",
      className: "state",
      position: { x: 0, y: 0 },
      data: { label: "Estado" },
    };
    setNodes([...nodes, node]);
  };

  const addTransition = () => {
    const node = {
      id: uuidv4(),
      //type: "ResizableNodeSelected",
      className: "transition",
      position: { x: 0, y: 0 },
      data: { label: "Transicion" },
    };
    setNodes([...nodes, node]);
  };

  const addGroup = () => {
    const node = {
      id: uuidv4(),
      data: { label: "Group" },
      position: { x: 10, y: 10 },
      className: "light",
      style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 600, height: 300 },
    };
    setNodes([...nodes, node]);
  };

  const onConnect = (params) => {
    //setEdges((eds) => addEdge(params, eds));
    const edge = {
      id: uuidv4(),
      source: params.source,
      target: params.target,
      label: "Conector",
      updatable: "target",
      markerEnd: { type: MarkerType.ArrowClosed },
    };

    setEdges([...edges, edge]);

    console.log("onConnect edge ->", edge);
  };

  //const nodeTypes = { ResizableNodeSelected };

  return (
    <Stack w={800} h={600} spacing={"xs"}>
      <Group position="left" p={0}>
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
        onNodeDragStop={onNodeDragStop}
        //nodeTypes={nodeTypes}
      >
        <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
      </ReactFlow>

      {selectedNode && open ? (
        <UpdateNodo node={selectedNode} open={open} setOpen={setOpen} updateNodeMetadata={updateNodeMetadata} />
      ) : null}
    </Stack>
  );
}

export default Flow;
