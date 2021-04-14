import React, {useEffect} from "react";
import {Link, useRouteMatch, useHistory} from "react-router-dom";
import {readDeck, deleteDeck} from "../utils/api/index";
import CardsList from "../Cards/CardsList";

function ViewDeck({ singleDeck, setSingleDeck}) {
  const history = useHistory();
  const {params} = useRouteMatch();
  const {deckId} = params;
  
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadDeck() {
      const deckData = await readDeck(deckId, signal);

      try {
        setSingleDeck(deckData);
      } catch (error) {
        if (error !== "AbortError") {
          throw error;
        }
      }
    } 
    loadDeck();

    return () => abortController.abort();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {singleDeck.name}
          </li>
        </ol>
      </nav>
      <h4>{singleDeck.name}</h4>
      <p>{singleDeck.description}</p>
      <div className="row">
        <div className="col">
        <button
            className="btn btn-secondary mr-1"
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            Edit
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => history.push(`/decks/${deckId}/study`)}
          >
            Study
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => history.push(`/decks/${deckId}/cards/new`)}
          >
            Add Cards
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-danger float-right"
            onClick={() => {
              const confirmDeleteDeck = window.confirm(
                "Delete this deck?\n \nYou will not be able to recover it."
              );
              if (confirmDeleteDeck) {
                const abortController = new AbortController();
                deleteDeck(deckId, abortController.signal);
                history.push("/");
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <h3>Cards</h3>
      <CardsList singleDeckCards={singleDeck.cards} />
    </div>
  );
}

export default ViewDeck;