import React, {useState, useEffect} from "react";
import { Link, useRouteMatch } from "react-router-dom";
import CardForm from "./CardForm";
import { readDeck } from "../utils/api/index";


function CreateCard() {
  const { params } = useRouteMatch();
  const { deckId } = params;
  const [singleDeck, setSingleDeck] = useState({});
  
  useEffect(() => {
       const abortController = new AbortController();
    const signal = abortController.signal;
    
        async function getDecks() {
        const decksData = await readDeck(signal);
      setSingleDeck(decksData);
              }
    getDecks();
  }, [])
  
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
      <h3><span>{singleDeck.name}</span>: Add Card</h3>
      <CardForm />
    </div>
  );
}

export default CreateCard;
