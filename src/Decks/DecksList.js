import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DecksList({decks}) {
    const history = useHistory();
    const abortController = new AbortController();
    const signal = abortController.signal;

    const listOfDecks=decks.map((deck) => {
        return (          
          <div className="card" key={deck.id}>
            <div className="card-title">
              <h3 className="mx-3">{deck.name}</h3>
              <p className="float-right mx-3">{deck.cards.length} cards</p>
            </div>
            <div className="card-body">{deck.description}</div>
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-secondary my-3 mx-1 ml-3"
                  onClick={() => {
                    history.push(`/decks/${deck.id}`);
                  }}
                >
                  View
                </button>
                <button
                  className="btn btn-primary my-3 mx-1"
                  onClick={() => {
                    history.push(`/decks/${deck.id}/study`);
                  }}
                >
                  Study
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger float-right m-3"
                  onClick={() => {
                    const deleteDeckConfirm = window.confirm(
                      "Delete this deck? \n \nYou will not be able to recover it."
                    );
                    if (deleteDeckConfirm) {
                      deleteDeck(deck.id, signal);
                      history.go(0);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      });

      return (
        <div>
          <button
            className="btn btn-secondary mb-2"
            onClick={() => history.push("/decks/new")}
          >
            Create Deck
          </button>
          {listOfDecks}
        </div>
      );
    }

export default DecksList;