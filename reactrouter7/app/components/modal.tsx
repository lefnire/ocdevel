import {
  memo,
  type FC
} from "react";
import Modal from 'react-bootstrap/cjs/Modal';
import {create} from "zustand/index";
import type {OverlayTriggerProps} from "react-bootstrap";
import {useShallow} from "zustand/react/shallow";

type ModalContent = {title?: string, body: FC}
export const useModalStore = create<{
  modal: OverlayTriggerProps['overlay'],
  open: boolean
  content: ModalContent
  openModal: (content: ModalContent) => void
  closeModal: () => void
}>()((set) => ({
  modal: <div></div>,
  open: false,
  content: {title: undefined, body: () => <div></div>},
  openModal: (content) => set({open: true, content}),
  closeModal: () => set({open: false}),
}))

// Reusable modal component
export const ModalSingleton = memo(() => {
  const [open, content, closeModal] = useModalStore(useShallow(s => [
    s.open,
    s.content,
    s.closeModal
  ]))
  const {title, body: Content} = content

  return (
    <Modal id="modal-singleton" show={open} onHide={closeModal} centered animation={false}>
      {title && <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>}
      <Modal.Body><Content /></Modal.Body>
    </Modal>
  );
});