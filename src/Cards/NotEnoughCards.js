import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

function NotEnoughCards({ singleDeckCards }) {
  const history = useHistory();
  const { params } = useRouteMatch();
  const { deckId } = params;
  return (
    <div>
      <h3>Not enough cards.</h3>
      <p>
        You need at least 3 cards to study. There are {singleDeckCards.length} cards
        in this deck.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => history.push(`/decks/${deckId}/cards/new`)}
      >
        Add Cards
      </button>
    </div>
  );
}

export default NotEnoughCards;