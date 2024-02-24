import React from "react";

const NextButton = ({ dispatch, answer, index, totalQuestions }) => {
  if (answer === null) {
    return null;
  }
  return index < totalQuestions - 1 ? (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    </div>
  ) : (
    <div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    </div>
  );
};

export default NextButton;
