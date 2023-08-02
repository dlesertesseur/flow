import { NodeResizer } from "reactflow";

// eslint-disable-next-line react/prop-types
const ResizableGroupNodeSelected = ({ data, selected }) => {
  return (
    <>
      <NodeResizer color="#0000ff" isVisible={selected} minWidth={100} minHeight={30} />
      <div style={{ padding: 10 }}>
        {
          // eslint-disable-next-line react/prop-types
          data.label
        }
      </div>
    </>
  );
};

export default ResizableGroupNodeSelected;
