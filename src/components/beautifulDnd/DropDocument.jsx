import { Droppable } from "react-beautiful-dnd";
import { Stack } from "@mantine/core";
import DragComponent from "./DragComponent";
import { useWindowSize } from "../../hook";

// eslint-disable-next-line react/prop-types
const DropDocument = ({ id, data = [] }) => {
  const wsize = useWindowSize();
  return (
    <Droppable droppableId={id}>
      {(provided,) => (
        <Stack p={"xs"} bg={"violet"} h={wsize.height - 20} {...provided.droppableProps} ref={provided.innerRef}>
          {data.map((item, index) => (
            <DragComponent key={item.id} id={item.id} index={index} value={item.value} />
          ))}
          {provided.placeholder}
        </Stack>
      )}
    </Droppable>
  );
};

export default DropDocument;
