import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/index";


function CardsList({singleDeckCards}) {
const history = useHistory();
const { url } = useRouteMatch();

const listOfCards = singleDeckCards.map((card) => {
    return (
        <div className="card" key={card.id}>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <p className="card-text">{card.front}</p>
              </div>
              <div className="col">
                <p className="card-text">{card.back}</p>
                <div className="float-right">
                <button
                className="btn btn-secondary mx-1"
                onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
              >
                  Edit
                </button>
                <button
                className="btn btn-danger mx-1"
                onClick={() => {
                  const confirmDeleteCard = window.confirm(
                    "Delete this card? \n \nYou will not be able to recover it."
                  );
                  if (confirmDeleteCard) {
                    const abortController = new AbortController();
                    deleteCard(card.id, abortController.signal);
                    history.go(0);
                  }
                }}
              >
                  Delete
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
});
return <div>{listOfCards}</div>
}

export default CardsList;