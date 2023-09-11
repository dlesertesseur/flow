import { Group, Text, TextInput } from "@mantine/core";
import { Draggable } from "react-beautiful-dnd";
const grid = 8;

const Item = ({ item, index }) => {
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle,
  });

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <Group p={"xs"} bg={"blue.1"}>
            <Group grow>
              <TextInput label={item.content} />
            </Group>
          </Group>
        </div>
      )}
    </Draggable>
  );
};

export default Item;
