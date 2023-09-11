import { Group, Paper } from "@mantine/core";
import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

// eslint-disable-next-line react/prop-types
const DragPanel = ({ id, index, value }) => {
  const [data, setData] = useState([])
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
          <Droppable droppableId={"panel-group"}>
            {(provided) => (
              <Group p={"xs"} bg={"lime.3"} h={60} {...provided.droppableProps} ref={provided.innerRef}>
                {data.map((item, index) => {
                  return buildComponent(item, index);
                })}
                {provided.placeholder}
              </Group>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
};

export default DragPanel;
