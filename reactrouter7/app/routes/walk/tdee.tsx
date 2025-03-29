import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function TDECalculator() {
  const [unit, setUnit] = useState<string>('imperial'); // 'metric' or 'imperial'
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState<string>('male');
  const [height, setHeight] = useState<number | ''>(''); // cm or inches
  const [weight, setWeight] = useState<number | ''>(''); // kg or lbs
  const [time, setTime] = useState<number | ''>(2); // Time in hours, default to 2
  const [speed, setSpeed] = useState<number | ''>(unit === 'metric' ? 3.21869 : 2); // km/h or mph, default to 2mph
  const [incline, setIncline] = useState<number | ''>(0); // Default incline to 0
  const [tdee, setTDEE] = useState<number | null>(null);

  const calculateTDEE = () => {
    // Implement a more accurate TDEE calculation logic here, considering units
    // This is an approximation, consult a professional for accurate results
    let calculatedTDEE = 0;
    let bmr = 0;

    // Harris-Benedict equation (simplified)
    if (gender === 'male') {
      bmr = (10 * (weight ? parseFloat(weight.toString()) : 0)) + (6.25 * (height ? parseFloat(height.toString()) : 0)) - (5 * (age ? parseFloat(age.toString()) : 0)) + 5;
    } else {
      bmr = (10 * (weight ? parseFloat(weight.toString()) : 0)) + (6.25 * (height ? parseFloat(height.toString()) : 0)) - (5 * (age ? parseFloat(age.toString()) : 0)) - 161;
    }

    // Activity factor (walking) - this is a rough estimate
    const activityFactor = 1.375;

    // Walking energy expenditure (very simplified)
    const walkingEnergy = (speed ? parseFloat(speed.toString()) : 0) * ((incline ? parseFloat(incline.toString()) : 0) === 0 ? 1 : (incline ? parseFloat(incline.toString()) : 0)) * (time ? parseFloat(time.toString()) : 0);

    calculatedTDEE = (bmr * activityFactor) + walkingEnergy;

    setTDEE(calculatedTDEE);
  };

  return (
    <Container>
      <h3 className="text-center">Calorie Calculator</h3>
      <div className="text-center">Similar to a TDEE (Total Daily Calorie Expenditure) calculator like <a href="https://www.calculator.net/tdee-calculator.html" target="_blank">this one</a>, this will calculate how much you can burn walking each day.</div>
      <Form>
        <Form.Group className="mb-2" controlId="formUnits">
          <Form.Label className="mb-0">Units</Form.Label>
          <Form.Control
            as="select"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </Form.Control>
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formAge">
              <Form.Label className="mb-0">Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value === '' ? '' : parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formGender">
              <Form.Label className="mb-0">Gender</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formHeight">
              <Form.Label className="mb-0">Height ({unit === 'metric' ? 'cm' : 'inches'})</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value === '' ? '' : parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formWeight">
              <Form.Label className="mb-0">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value === '' ? '' : parseInt(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formTime">
              <Form.Label className="mb-0">Time (hours)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter time in hours"
                value={time}
                onChange={(e) => setTime(e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formSpeed">
              <Form.Label className="mb-0">Speed ({unit === 'metric' ? 'km/h' : 'mph'})</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter speed in ${unit === 'metric' ? 'km/h' : 'mph'}`}
                value={speed}
                onChange={(e) => setSpeed(e.target.value === '' ? '' : parseFloat(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-1" controlId="formIncline">
          <Form.Label className="mb-0">Incline (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter incline in percentage"
            value={incline}
            onChange={(e) => setIncline(e.target.value === '' ? '' : parseFloat(e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" onClick={calculateTDEE}>
          Calculate TDEE
        </Button>
      </Form>

      {tdee !== null && (
        <Row>
          <Col md={6}>
            <div>
              <h4>Your TDEE:</h4>
              <p>{tdee ? tdee.toFixed(2) : '0'} calories (approximation)</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}