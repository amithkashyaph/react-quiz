import React from "react";

const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h4>Test your React skills by answering the {numQuestions} questions</h4>
      <button className="start-btn" onClick={() => dispatch({ type: "start" })}>
        Let's get started
      </button>
    </div>
  );
};

export default StartScreen;
