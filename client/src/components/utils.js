import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FaArrowLeft} from "@react-icons/all-files/fa/FaArrowLeft";
import React from "react";

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