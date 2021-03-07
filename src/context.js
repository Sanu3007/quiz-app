import React, { useState, useContext } from "react";

const table = {
  Sports: 21,
  History: 23,
  ComputerScience: 18,
  GeneralKnowledge: 9,
  Gadgets: 30,
  Mythology: 20,
  Celebrities: 26,
  Politics: 24,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

// const tempUrl =
// ("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple");

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [ismodal, setModal] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  // Next question
  const nextQuestion = (e) => {
    e.target.style.backgroundColor = setIndex((oldIndex) => {
      const index = oldIndex + 1;
      // if (index > questions.length - 1) {
      //   return oldIndex;
      // } else {
      //   return index;
      // }
      return index;
    });
  };

  // Prev Question
  const prevQuestion = () => {
    setIndex((oldIndex) => {
      return oldIndex - 1;
    });
  };

  // Submit Answers
  const submitAnswers = () => {
    openModal();
  };

  // check Question
  const checkQuestion = (value, e) => {
    console.log(e.target);
    // e.target.classList.add("change-btn-color");
    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      });
    }

    nextQuestion(e);
  };

  // Open Modal
  const openModal = () => {
    setModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setCorrect(0);
    setModal(false);
    setWaiting(true);
  };

  // Handle Input Change from setupForm
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };

  // Fetch questions
  const fetchQuestions = async (url) => {
    try {
      setLoading(true);
      setWaiting(false);
      const response = await fetch(url);
      const { results: data } = await response.json();
      console.log(data);
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setError(false);
        setWaiting(false);
      } else {
        setLoading(false);
        setWaiting(true);
        setError(true);
      }
    } catch (error) {
      setWaiting(true);
      setError(true);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, category, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };

  // useEffect(() => {
  //   fetchQuestions(tempUrl);
  // }, []);

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        error,
        correct,
        ismodal,
        quiz,
        nextQuestion,
        prevQuestion,
        checkQuestion,
        closeModal,
        handleChange,
        handleSubmit,
        submitAnswers,
        setError,
        setWaiting,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
