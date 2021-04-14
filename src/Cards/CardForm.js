import React, { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { createCard, updateCard, readCard } from "../utils/api/index";

function CardForm() {
  const history = useHistory();
  const { path, params } = useRouteMatch();
  const { deckId, cardId } = params;
console.log(path)

  const initialFormData = {
    front: "",
    back: "",
  };

  const abortController = new AbortController();
  const signal = abortController.signal;

  const [formData, setFormData] = useState({});

  useEffect(() => {
    cardId
      ? readCard(cardId, signal).then(setFormData)
      : setFormData({ ...initialFormData });
  }, [cardId]);

  const handleFormChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form
    onSubmit={() => {
      if (path === `/decks/:deckId/cards/new`) {
        createCard(deckId, formData, signal);
      } else {
        updateCard(formData);
      }
      setFormData({ ...initialFormData });
      history.push(`/decks/${deckId}`);
    }}
      // onSubmit={() => {
      //   if (path === `/decks/:deckId/cards/new`) {
      //     createCard(deckId, formData, signal);
      //     setFormData({ ...initialFormData });
      //   } else {
      //     updateCard(formData);
      //     setFormData({ ...initialFormData });

      //   }
      //   history.push(`/decks/${deckId}`);
      // }}
    >
      <div className="mb-3">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          value={formData.front}
          onChange={handleFormChange}
          placeholder="Front side of card"
          rows="2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          value={formData.back}
          onChange={handleFormChange}
          placeholder="Back side of card"
          rows="2"
        />
      </div>
      {path === "/decks/:deckId/cards/new" ? (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ ...initialFormData });
              history.push(`/decks/${deckId}`);
            }}
          >
            Done
          </button>
          <button className="btn btn-primary mx-2" type="submit">
            Save
          </button>
        </div>
      ) : (
        <div>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setFormData({ ...initialFormData });
              history.push(`/decks/${deckId}`);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary mx-2" type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  );
}

export default CardForm;