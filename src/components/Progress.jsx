import React from "react";

const Progress = ({ index, numQuestions, points, totalPoints, answer }) => {
  return (
    <>
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <div className="progress-container">
        <header className="progress">
          <p>
            Question <strong>{index + 1}</strong> / {numQuestions}
          </p>
          <p>
            <strong>{points}</strong> / {totalPoints}
          </p>
        </header>
      </div>
    </>
  );
};

export default Progress;
