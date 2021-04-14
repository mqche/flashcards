import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCards({singleDeckCards}) {
  const history = useHistory();
  const initialStudyState = {
    count: 1,
    front: true,
  };

  const [study, setStudy] = useState({ ...initialStudyState });

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title">
          Card {study.count} of {singleDeckCards.length}
        </h4>
        <p className="card-text">
          {study.front
            ? singleDeckCards[study.count - 1].front
            : singleDeckCards[study.count - 1].back}
        </p>
        <div>
          <button
            className="btn btn-secondary"
            onClick={() =>
              setStudy({
                ...study,
                front: !study.front,
              })
            }
          >
            Flip
          </button>
          {study.front ? null : (
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                if (!singleDeckCards[study.count]) {
                  const confirmRestart = window.confirm(
                    "Restart cards?\n\nClick 'cancel' to return to the home page."
                  );
                  confirmRestart
                    ? setStudy({ ...initialStudyState })
                    : history.push("/");
                } else {
                  setStudy({
                    count: study.count + 1,
                    front: true,
                  });
                }
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyCards;