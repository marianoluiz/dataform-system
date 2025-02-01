import React, { createContext, useState, useContext } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  // showModal is true to show the modal
  const [showModal, setShowModal] = useState(false);
  // mark if modal is opened, the modal wont popup again
  const [modalOpened, setModalOpened] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setModalOpened(true);
  }
  const closeModal = () => setShowModal(false);

  return (
    <ModalContext.Provider
      value={{ showModal, openModal, closeModal, modalOpened }}
    >
      {children}
    </ModalContext.Provider>
  );
};
