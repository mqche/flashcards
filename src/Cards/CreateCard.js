import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";

function CreateCard({ singleDeck }) {
  const { params } = useRouteMatch();
  const { deckId } = params;

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{singleDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{singleDeck.name}: Add Card</h3>
      <CardForm />
    </div>
  );
}

export default CreateCard;