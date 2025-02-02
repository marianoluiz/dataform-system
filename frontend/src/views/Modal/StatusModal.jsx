import { useModal } from "../../context/ModalContext";

const Modal = () => {
  const {
    showStatusModal, // status modal
    modalMessage,
    modalType,
    closeStatusModal,
  } = useModal();

  if (!showStatusModal) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal__header d-flex">
          <span className="close" onClick={closeStatusModal}>
            &times;
          </span>
          <p className={`modal__title text-center ${modalType}`}>
            {modalType === "success" ? "Success" : "Error"}
          </p>
        </div>
        <p className="modal__text mt-3">{modalMessage}</p>
      </div>
    </div>
  );
};

export default Modal;
