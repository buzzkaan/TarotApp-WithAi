"use client";
import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Card from "../../components/Card/Card";
import SelectedCardsArea from "../../components/SelectedCard/SelectedCardArea";

const App: React.FC = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [cards, setCards] = useState([
    { id: 1, text: "Kart 1" },
    { id: 2, text: "Kart 2" },
    { id: 3, text: "Kart 3" },
    { id: 4, text: "Kart 4" },
    { id: 5, text: "Kart 5" },
    { id: 6, text: "Kart 6" },
    { id: 7, text: "Kart 7" },
    { id: 8, text: "Kart 8" },
    { id: 9, text: "Kart 9" },
    { id: 10, text: "Kart 10" },
    { id: 11, text: "Kart 11" },
    { id: 12, text: "Kart 12" },
  ]);
  const [draggedCardId, setDraggedCardId] = useState<number | null>(null);
  const handleCardSelect = (id: number) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const draggedCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, draggedCard);
    setCards(newCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-8 min-h-screen w-full min-w-full">
        <h1 className="text-2xl font-bold mb-4">Kart Uygulaması</h1>
        <div className="flex w-full flex-wrap gap-5">
          <h1>Tüm Kartlar</h1>
          {cards
            .filter((card) => !selectedCards.includes(card.id)) // Sadece seçili kartları filtreleyerek görüntüle
            .map((card, index) => (
              <Card
                key={card.id}
                id={card.id}
                text={card.text}
                index={index}
                moveCard={moveCard}
                setDraggedCardId={setDraggedCardId}
              />
            ))}
        </div>
        <SelectedCardsArea
          selectedCards={selectedCards}
          handleRemoveCard={handleCardSelect}
        />
      </div>
    </DndProvider>
  );
};

export default App;
