import React from "react";

const Question = ({ questionObj, dispatch, answer }) => {
  const { question, options, correctOption } = questionObj;

  const hasAnswered = answer !== null;
  return (
    <div className="question">
      <h5>{question}</h5>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
            } `}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
