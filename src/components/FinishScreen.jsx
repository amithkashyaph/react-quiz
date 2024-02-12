import React from "react";

const FinishScreen = ({ points, totalPoints, highScore, dispatch }) => {
  const percentage = (points / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage <= 90 && percentage >= 80) emoji = "🥈";
  if (percentage <= 80 && percentage >= 60) emoji = "🙂";
  if (percentage <= 60 && percentage >= 35) emoji = "🤔";
  if (percentage === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You have scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Highscore : {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
