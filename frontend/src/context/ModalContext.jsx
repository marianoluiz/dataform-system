import { createContext, useState, useContext } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  // Initial modal, showModal is true to show the modal
  const [showModal, setShowModal] = useState(false);
  // mark if modal is opened, the initial modal wont popup again
  const [modalOpened, setModalOpened] = useState(false);

  // this modal is like the initial when page load
  const openModal = () => {
    setShowModal(true);
    setModalOpened(true);
  };
  const closeModal = () => setShowModal(false);


  // for status modals
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const openStatusModal = (message, type) => {
    setModalMessage(message);
    setModalType(type);
    setShowStatusModal(true);
  };

  const closeStatusModal = () => setShowStatusModal(false);

  return (
    <ModalContext.Provider
      value={{
        showModal, // initial modal
        openModal,
        closeModal,
        modalOpened,
        showStatusModal, // status modal
        modalMessage,
        modalType,
        openStatusModal,
        closeStatusModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};