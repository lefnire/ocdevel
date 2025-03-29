import React, { useState, useCallback, createContext, useContext, useMemo } from "react";
import { Modal } from 'react-bootstrap';

// Custom styles
export const clickableStyle: React.CSSProperties = {
  borderBottom: '1px dotted #6c757d', // Gray dotted border
  cursor: 'pointer'
};

// Modal context for managing which modal is currently open
type ModalContextType = {
  openModal: (id: string, title: string, content: React.ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
  modalId: string;
  modalTitle: string;
  modalContent: React.ReactNode;
};

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  isOpen: false,
  modalId: '',
  modalTitle: '',
  modalContent: null
});

// Modal provider component
export const ModalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = useCallback((id: string, title: string, content: React.ReactNode) => {
    setModalId(id);
    setModalTitle(title);
    setModalContent(content);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(() => ({
    openModal,
    closeModal,
    isOpen,
    modalId,
    modalTitle,
    modalContent
  }), [openModal, closeModal, isOpen, modalId, modalTitle, modalContent]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      <InfoModal />
    </ModalContext.Provider>
  );
};

// Hook to use the modal context
export const useModal = () => useContext(ModalContext);

// Reusable modal component
const InfoModal = React.memo(() => {
  const { isOpen, closeModal, modalTitle, modalContent } = useModal();
  
  return (
    <Modal show={isOpen} onHide={closeModal} centered animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalContent}</Modal.Body>
    </Modal>
  );
});