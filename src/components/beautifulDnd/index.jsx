import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Grid} from "@mantine/core";
import { useWindowSize } from "../../hook";
import DragToolbar from "./DragToolbar";
import DropDocument from "./DropDocument";
import uuid from "react-uuid";

const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    value: `item ${k}`,
  }));

const Dnd = () => {
  const wsize = useWindowSize();
  const [items, setItems] = useState(getItems(10));
  const [itemDocuments, setItemDocuments] = useState([]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId === "document") {
      const obj = { id: uuid(), value: "cadorna" };
      setItemDocuments([...itemDocuments, obj]);
    }

    const data = reorder(items, result.source.index, result.destination.index);
    setItems(data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid w={wsize.width} h={wsize.height} gutter={0}>
        <Grid.Col span={2}><DragToolbar id={"toolbar"} data={items} /></Grid.Col>
        <Grid.Col span="auto"><DropDocument id={"document"} data={itemDocuments} /></Grid.Col>
      </Grid>
    </DragDropContext>
  );
};

export default Dnd;
