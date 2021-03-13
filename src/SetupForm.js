import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz Form</h2>

          {/* amount */}
          <div className="form-control">
            <label htmlFor="amount">No of questions</label>
            <input
              type="number"
              name="amount"
              id="amount"
              className="form-input"
              value={quiz.amount}
              onChange={handleChange}
            />
          </div>

          {/* category */}
          <div className="form-control">
            <label htmlFor="category">Select category</label>
            <select
              name="category"
              id="category"
              className="form-input"
              value={quiz.category}
              onChange={handleChange}
            >
              <option value="history">history</option>
              <option value="sports">sports</option>
              <option value="ComputerScience">ComputerScience</option>
              <option value="GeneralKnowledge">GeneralKnowledge</option>
              <option value="Gadgets">Gadgets</option>
              <option value="Mythology">Mythology</option>
              <option value="Celebrities">Celebrities</option>
              <option value="Politics">Politics</option>
            </select>
          </div>

          {/* difficulty */}
          <div className="form-control">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="form-input"
              value={quiz.difficulty}
              onChange={handleChange}
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              Unable to generate questions....try with other options
            </p>
          )}
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
