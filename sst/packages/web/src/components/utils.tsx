import React, {Suspense, useCallback} from "react";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";

interface BackButton {
  to?: string
}
export const BackButton = ({to}: BackButton) => {
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  }, [to])

  return <Button
    className="text-dark mb-2"
    variant="link"
    onClick={onClick}
  >
    <FaArrowLeft /> Back
  </Button>
};

const Modal_ = <Modal show={true} animation={false}>
  <Modal.Header>
    <Modal.Title>Loading...</Modal.Title>
  </Modal.Header>
</Modal>

export function Lazy ({c}) {
  const C = React.lazy(c)
  return <Suspense fallback={Modal_}>
    <C />
  </Suspense>
}