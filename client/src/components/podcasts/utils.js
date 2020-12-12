import {Button} from "react-bootstrap";
import {FaArrowLeft} from "react-icons/all";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

export function BackButton() {
  return <Button className="back-button mb-2 float-right" href="/mlg" variant="outline-secondary" size="sm">
    <FaArrowLeft /> All Episodes
  </Button>

  // TODO using LinkContainer loses the variant syles
  return <LinkContainer to="/mlg">
    <Button variant="outline-secondary" size="sm">&lt; All Episodes</Button>
  </LinkContainer>
}

export const patreonLink = 'https://www.patreon.com/machinelearningguide'