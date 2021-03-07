import React from "react";
import { useGlobalContext } from "./context";

import SetupForm from "./SetupForm";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    nextQuestion,
    prevQuestion,
    checkQuestion,
    submitAnswers,
    setError,
  } = useGlobalContext();

  if (waiting) return <SetupForm />;
  if (loading) return <Loading />;
  if (questions.length === 0) {
    setError(true);
    return <SetupForm />;
  }

  const { question, incorrect_answers, correct_answer } = questions[index];
  let answers = [...incorrect_answers];
  const answerIndex = Math.floor(Math.random() * 4);
  console.log(answerIndex);
  if (answerIndex === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[answerIndex]);
    answers[answerIndex] = correct_answer;
  }

  return (
    <main>
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct answers :{correct}/{questions.length}
        </p>
        <article className="container">
          <h2
            dangerouslySetInnerHTML={{ __html: `Q${index + 1}. ${question}` }}
          />
          <div className="btn-container">
            {answers.map((answer, index) => {
              return (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={(e) => checkQuestion(correct_answer === answer, e)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></button>
              );
            })}
          </div>
        </article>
        <div className="option-container">
          {/* <button
            disabled={index === 0 ? "true" : ""}
            className={`${
              index === 0 ? "prev-question disabled" : "prev-question"
            }`}
            onClick={prevQuestion}
          >
            prev question
          </button> */}
          <button
            disabled={index === questions.length - 1 ? "true" : ""}
            className={`${
              index === questions.length - 1
                ? "next-question disabled"
                : "next-question"
            }`}
            onClick={nextQuestion}
          >
            next question
          </button>
        </div>
        <button className="answer-submit" onClick={submitAnswers}>
          Submit
        </button>
      </section>
    </main>
  );
}

export default App;
