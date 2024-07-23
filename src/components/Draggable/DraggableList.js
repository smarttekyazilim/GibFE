import React from "react";
import DraggableListItem from "./DraggableListItem";
import { DragDropContext } from "react-beautiful-dnd";
import { EnchantedDroppable } from "./EnchantedDroppable";

const DraggableList = React.memo(({ items, onDragEnd, size, link = false }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <EnchantedDroppable droppableId="droppable-list">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <DraggableListItem
                item={item}
                index={index}
                size={size}
                key={item.id}
                active={item?.active}
                link={link}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </EnchantedDroppable>
    </DragDropContext>
  );
});

export default DraggableList;
