import React from "react";
import { Link, useHistory } from "react-router-dom";
import DeckForm from "./DeckForm";

function CreateDeck() {
    const history = useHistory();

    const handleCancel = () => {
        history.push("/");
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Create Deck
          </li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <DeckForm handleCancel={handleCancel} />
        </div>
    );
}

export default CreateDeck;