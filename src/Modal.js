import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { ismodal, closeModal, correct, questions } = useGlobalContext();

  return (
    <div
      className={`${ismodal ? "modal-container isOpen" : "modal-container"}`}
    >
      <div className="modal-content">
        <h2>Congrats!!</h2>
        <p>
          You have answered {((correct / questions.length) * 100).toFixed(2)}%
          questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          play again
        </button>
      </div>
    </div>
  );
};

export default Modal;
