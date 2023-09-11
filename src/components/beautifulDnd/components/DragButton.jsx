import { Button, Paper, Select, Textarea } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";

// eslint-disable-next-line react/prop-types
const DragButton = ({ id, index, value }) => {
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
          <Button>{value}</Button>
        </Paper>
      )}
    </Draggable>
  );
};

export default DragButton;
