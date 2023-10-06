import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";

function Deck() {
  const [deckId, setDeckId] = useState(null);
  const [cardImage, setCardImage] = useState(null);
  const [remaining, setRemaining] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const alreadyAlerted = useRef(false);

  useEffect(() => {
    async function fetchNewDeck() {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/"
      );
      const data = await res.json();
      setDeckId(data.deck_id);
      setRemaining(data.remaining);
    }
    fetchNewDeck();
  }, []);

  const drawCard = async () => {
    if (remaining === 0) {
      if (!alreadyAlerted.current) {
        alert("Error: no cards remaining!");
        alreadyAlerted.current = true;
      }
      return;
    }

    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/`
    );
    const data = await res.json();
    setCardImage(data.cards[0].image);
    setRemaining(data.remaining);
  };

  const shuffleDeck = async () => {
    setIsShuffling(true); // Start shuffling
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`
    );
    const data = await res.json();
    setRemaining(data.remaining);
    setCardImage(null); // Remove displayed card
    setIsShuffling(false); // End shuffling
  };

  return (
    <div>
      <Card image={cardImage} />
      <button onClick={drawCard} disabled={isShuffling}>
        Draw a Card
      </button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        Shuffle Deck
      </button>
    </div>
  );
}

export default Deck;
