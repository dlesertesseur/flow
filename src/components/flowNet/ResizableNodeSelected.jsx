import { Handle, Position, NodeResizer } from 'reactflow';

// eslint-disable-next-line react/prop-types
const ResizableNodeSelected = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="#0000ff" isVisible={selected} minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div style={{ padding: 10 }}>{data.label}</div>
    </>
  );
};

export default ResizableNodeSelected;