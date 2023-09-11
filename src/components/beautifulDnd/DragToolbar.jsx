import { Droppable } from "react-beautiful-dnd";
import DragToolbarComponent from "./DragToolbarComponent";
import { Stack } from "@mantine/core";
import { useWindowSize } from "../../hook";

// eslint-disable-next-line react/prop-types
const DragToolbar = ({ id, data = [] }) => {
  const wsize = useWindowSize();
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <Stack
          bg={"orange"}
          p={"xs"}
          spacing={"xs"}
          h={wsize.height - 20}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data.map((item, index) => (
            <DragToolbarComponent key={item.id} id={item.id} index={index} value={item.value} icon={item.icon} />
          ))}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
};

export default DragToolbar;
