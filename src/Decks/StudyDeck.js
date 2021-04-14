import React, {useState, useEffect} from "react";
import { useRouteMatch, Link } from "react-router-dom";
import {readDeck} from "../utils/api/index";
import StudyCards from "../Cards/StudyCards";
import NotEnoughCards from "../Cards/NotEnoughCards";

function StudyDeck({ singleDeck, setSingleDeck}) {
    const { params } = useRouteMatch();
    const { deckId } = params;
    
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
            <Link to={`/decks/${deckId}`}>{singleDeck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>

<h2>{singleDeck.name}: Study </h2>      
{(singleDeck.cards.length < 3) ? 
<NotEnoughCards singleDeckCards={singleDeck.cards} />  : <StudyCards singleDeckCards={singleDeck.cards} /> }
        </div>
    )
}

export default StudyDeck; 
