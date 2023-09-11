import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Grid } from "@mantine/core";
import { useWindowSize } from "../../hook";
import { Components } from "./Constants";
import DragToolbar from "./DragToolbar";
import DropDocument from "./components/DropDocument";
import uuid from "react-uuid";

const toolbarComponents = [
  { id: Components.types.panel, value: "Panel", icon: null },
  { id: Components.types.label, value: "Label", icon: null },
  { id: Components.types.textInput, value: "TextInput", icon: null },
  { id: Components.types.textArea, value: "TextArea", icon: null },
  { id: Components.types.select, value: "Select", icon: null },
  { id: Components.types.checkbox, value: "Checkbox", icon: null },
  { id: Components.types.button, value: "Button", icon: null },
];

const DndPanel = () => {
  const wsize = useWindowSize();
  const [items, setItems] = useState(toolbarComponents);
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

    if (result.source.droppableId !== result.destination.droppableId) {
      if (result.destination.droppableId === "document") {
        const obj = { id: uuid(), value: result.draggableId, type: result.draggableId };
        setItemDocuments([...itemDocuments, obj]);
      }
    } else {
      if (result.destination.droppableId === "document") {
        const data = reorder(itemDocuments, result.source.index, result.destination.index);
        setItemDocuments(data);
      }
    }
  };

  const onDragStart = (result) => {
    //console.log("onDragStart result -> ", result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <Grid w={wsize.width} h={wsize.height} gutter={0}>
        <Grid.Col span={2}>
          <DragToolbar id={"toolbar"} data={items} />
        </Grid.Col>
        <Grid.Col span="auto">
          <DropDocument id={"document"} data={itemDocuments} />
        </Grid.Col>
      </Grid>
    </DragDropContext>
  );
};

export default DndPanel;
