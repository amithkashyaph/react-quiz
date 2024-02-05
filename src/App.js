import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import { useEffect, useReducer, useState } from "react";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";

const initialState = {
  questions: [],
  status: "loading", // different states : loading, error, active, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "start": {
      return {
        ...state,
        status: "active",
      };
    }
    case "newAnswer": {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    default:
      throw new Error("Unknown action dispatched!");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalPoints, setTotalPoints] = useState(0);
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
        const totalPoints = data.reduce(
          (val, question) => val + question.points,
          0
        );
        setTotalPoints(totalPoints);
      })
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);
  const { questions, index, status, answer, points } = state;
  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              questionObj={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
