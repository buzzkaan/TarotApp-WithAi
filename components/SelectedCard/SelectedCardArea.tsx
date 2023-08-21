// SelectedCardsArea.tsx
import React from "react";
import { useDrop } from "react-dnd";
import Card from "../Card/Card";

interface SelectedCardsAreaProps {
  selectedCards: number[];
  handleRemoveCard: (id: number) => void;
}

const SelectedCardsArea: React.FC<SelectedCardsAreaProps> = ({
  selectedCards,
  handleRemoveCard,
}) => {
  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item: { id: number }) => {
      if (!selectedCards.includes(item.id)) {
        handleRemoveCard(item.id);
      }
    },
  });

  return (
    <div ref={drop} className="border p-4 mt-4">
      <h2 className="text-lg font-semibold">Seçili Kartlar</h2>
      <ul>
        {selectedCards.map((id) => (
          <li key={id} className="flex justify-between">
            <Card
              id={id}
              text={`Kart ${id}`}
              index={id} // Bu kısmı gerekirse düzenleyebilirsiniz.
              moveCard={() => {}}
              setDraggedCardId={() => {}}
            />
            <button
              onClick={() => handleRemoveCard(id)}
              className="text-red-500"
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedCardsArea;
