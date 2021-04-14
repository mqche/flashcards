import { Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DecksList from "../Decks/DecksList";
import ViewDeck from "../Decks/ViewDeck";
import CreateDeck from "../Decks/CreateDeck";
import EditDeck from "../Decks/EditDeck";
import StudyDeck from "../Decks/StudyDeck";
import CreateCard from "../Cards/CreateCard"
import EditCard from "../Cards/EditCard";
import { listDecks } from "../utils/api/index";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [singleDeck, setSingleDeck] = useState({ cards: [] });

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function getDecks() {
      const decksData = await listDecks(signal);
      setDecks(decksData);
    }
    getDecks();

    return () => abortController.abort();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DecksList decks={decks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <ViewDeck singleDeck={singleDeck} setSingleDeck={setSingleDeck} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <StudyDeck singleDeck={singleDeck} setSingleDeck={setSingleDeck} />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck
              singleDeck={singleDeck}
              setSingleDeck={setSingleDeck}
            />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CreateCard singleDeck={singleDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard singleDeck={singleDeck} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
