import React, {Suspense} from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";

export const BackButton = () => {
  const history = useHistory();
  return <Button
    className="text-dark mb-2"
    variant="link"
    onClick={() => history.goBack()}
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
    <C/>
  </Suspense>
}