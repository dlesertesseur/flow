import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Item from "./Item";

const grid = 8;

const Dnd = () => {
  const getItems = (count) =>
    Array.from({ length: count }, (v, k) => k).map((k) => ({
      id: `item-${k}`,
      content: `item ${k}`,
    }));

  const [items, setItems] = useState(getItems(10));

  const reorder = (list, startIndex, endIndex) => {

    console.log("reorder -> ", list, startIndex, endIndex);

    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250,
  });

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const data = reorder(items, result.source.index, result.destination.index);

    setItems(data);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
            {items.map((item, index) => (
              <Item key={index} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Dnd;
