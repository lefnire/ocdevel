import {
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
  memo,
  type CSSProperties,
  type ReactNode,
  type FC
} from "react";
import Modal from 'react-bootstrap/cjs/Modal';

// Modal context for managing which modal is currently open
type ModalContextType = {
  openModal: (id: string, title: string, content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
  modalId: string;
  modalTitle: string;
  modalContent: ReactNode;
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
export const ModalProvider: FC<{children: ReactNode}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalId, setModalId] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = useCallback((id: string, title: string, content: ReactNode) => {
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
const InfoModal = memo(() => {
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