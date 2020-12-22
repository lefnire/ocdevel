import React, {useEffect, useState} from 'react'
import {Col, Row} from "react-bootstrap";

export default function Home() {
  const col = {md: 3, sm: 1}
  return <Row>
    <Col {...col}>
      About me
    </Col>
    <Col {...col}>
      Projects
    </Col>
    <Col {...col}>
      Podcasts
    </Col>
  </Row>
}