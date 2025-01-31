import { useModal } from "../../context/ModalContext";

const Modal = () => {
  const { showModal, closeModal } = useModal();

  if (!showModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal__header d-flex">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <p className="modal__title text-center">
            You are in production environment.
          </p>
        </div>

        <p className="modal__text">
          <br />
          Please note that the database is not currently hosted due to budget
          constraints
          <br />
          <br />
          Thank you for your understanding.
        </p>
      </div>
    </div>
  );
};

export default Modal;
