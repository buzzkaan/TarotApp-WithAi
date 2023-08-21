// Card.tsx
import React, { useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

interface CardProps {
  id: number;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  setDraggedCardId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card: React.FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
  setDraggedCardId,
}) => {
  const [{ isDragging }, ref] = useDrag({
    type: "CARD",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      setDraggedCardId(id);
    } else {
      setDraggedCardId(null);
    }
  }, [isDragging, id, setDraggedCardId]);

  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem: { id: number; index: number }) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => {
        ref(node);
        drop(node);
      }}
      className="p-4 border border-gray-300 rounded-md m-2 cursor-pointer hover:bg-gray-100"
    >
      {text}
    </div>
  );
};

export default Card;
