import { Paper, Select } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";

// eslint-disable-next-line react/prop-types
const DragSelect = ({ id, index, value }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          bg={"gray.2"}
          p={"xs"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Select label={value} data={[]}/>
        </Paper>
      )}
    </Draggable>
  );
};

export default DragSelect;
