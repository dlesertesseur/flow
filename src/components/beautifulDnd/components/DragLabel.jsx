import { Paper, Text } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";

// eslint-disable-next-line react/prop-types
const DragLabel = ({ id, index, value }) => {
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
          <Text size={"md"} weight={600}>{value}</Text>
        </Paper>
      )}
    </Draggable>
  );
};

export default DragLabel;
