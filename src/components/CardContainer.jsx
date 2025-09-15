import React, { useState, useRef, useEffect } from "react";
import Cards from "./Cards";

const CardContainer = () => {
  const constraintsRef = useRef(null);

  // Load cards from localStorage or initial data
  const [cards, setCards] = useState(() => {
    return JSON.parse(localStorage.getItem("cards")) || [
      {
        id: 1,
        description: "Sample Image Card",
        file: ["https://via.placeholder.com/150.png"],
      },
      {
        id: 2,
        description: "PDF Example",
        file: ["https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"],
      },
    ];
  });

  // Sync cards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  // Delete card
  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards); // update state
    // localStorage automatically updated by useEffect
  };

  return (
    <div ref={constraintsRef} className="flex flex-wrap gap-4 p-4">
      {cards.map((card) => (
        <Cards
          key={card.id}
          card={card}
          refrance={constraintsRef}
          onDelete={handleDeleteCard}
        />
      ))}
    </div>
  );
};

export default CardContainer;
