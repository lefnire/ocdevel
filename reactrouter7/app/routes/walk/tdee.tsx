import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

// Define types for better type safety
type UnitSystem = 'metric' | 'imperial';
type NumberOrEmpty = number | '';

// Unit conversion functions
const convertToMetric = {
  weight: (lbs: number): number => lbs * 0.453592, // lbs to kg
  height: (inches: number): number => inches * 2.54, // inches to cm
  speed: (mph: number): number => mph * 1.60934, // mph to km/h
};

const convertToImperial = {
  weight: (kg: number): number => kg / 0.453592, // kg to lbs
  height: (cm: number): number => cm / 2.54, // cm to inches
  speed: (kmh: number): number => kmh / 1.60934, // km/h to mph
};

export default function TDECalculator() {
  const [unit, setUnit] = useState<UnitSystem>('imperial');
  // Age is not used in MET-based walking calorie calculations
  // Gender is not used in MET-based walking calorie calculations
  const [height, setHeight] = useState<NumberOrEmpty>(''); // cm or inches
  const [weight, setWeight] = useState<NumberOrEmpty>(''); // kg or lbs
  const [time, setTime] = useState<NumberOrEmpty>(2); // Time in hours, default to 2
  // Set default speed based on selected unit
  const [speed, setSpeed] = useState<NumberOrEmpty>(() =>
    unit === 'metric' ? parseFloat(convertToMetric.speed(2).toFixed(2)) : 2
  );
  const [incline, setIncline] = useState<NumberOrEmpty>(0); // Default incline to 0%
  const [calories, setCalories] = useState<number | null>(null);

  // Helper function to safely parse numeric values
  const parseNumeric = (value: NumberOrEmpty): number => {
    if (value === '') return 0;
    return typeof value === 'number' ? value : Number(value);
  };

  // No longer needed as we're only calculating walking calories

  // Calculate calories burned from walking
  const calculateWalkingCalories = (): number => {
    const weightValue = parseNumeric(weight);
    const speedValue = parseNumeric(speed);
    const inclineValue = parseNumeric(incline);
    const timeValue = parseNumeric(time);
    
    // Convert to metric if using imperial
    const weightInKg = unit === 'imperial' ? convertToMetric.weight(weightValue) : weightValue;
    const speedInKmh = unit === 'imperial' ? convertToMetric.speed(speedValue) : speedValue;
    
    // MET value calculation based on speed and incline
    // MET = Metabolic Equivalent of Task, 1 MET = 1 kcal/kg/hour at rest
    let met = 2.0; // Base MET for very slow walking
    
    // Adjust MET based on speed (km/h)
    if (speedInKmh < 3.2) {
      met = 2.0;
    } else if (speedInKmh < 4.0) {
      met = 2.8;
    } else if (speedInKmh < 4.8) {
      met = 3.0;
    } else if (speedInKmh < 5.6) {
      met = 3.5;
    } else if (speedInKmh < 6.4) {
      met = 4.3;
    } else if (speedInKmh < 7.2) {
      met = 5.0;
    } else {
      met = 6.0;
    }
    
    // Adjust MET for incline (approximate adjustment)
    // Each 1% of incline increases MET by about 8-10%
    const inclineMultiplier = 1 + (inclineValue * 0.08);
    met *= inclineMultiplier;
    
    // Calculate calories: MET * weight in kg * time in hours
    return met * weightInKg * timeValue;
  };

  // git-blame for auto conversion between metric/imperial. I think that's overboard.

  return (
    <Container>
      <h4 className="text-center">Walking Calorie Calculator</h4>
      <div className="text-center">Calculate how many calories you can burn while using a walking pad. This adds to your <a href="https://www.calculator.net/tdee-calculator.html" target="_blank">TDEE</a> (Total Daily Energy Expenditure).</div>
      <Form>
        <Form.Group className="mb-2">
          <Form.Label className="mb-0">Units</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              id="unitImperial"
              label="Imperial"
              name="unitSystem"
              checked={unit === 'imperial'}
              onChange={() => setUnit('imperial')}
              className="me-3"
            />
            <Form.Check
              type="radio"
              id="unitMetric"
              label="Metric"
              name="unitSystem"
              checked={unit === 'metric'}
              onChange={() => setUnit('metric')}
            />
          </div>
        </Form.Group>

        <Row>
          {/* Age field removed - not used in MET-based walking calorie calculations */}
          {/* Gender field removed - not used in MET-based walking calorie calculations */}
          <Col md={6}>
            <Form.Group className="mb-1" controlId="formHeight">
              <Form.Label className="mb-0">Height ({unit === 'metric' ? 'cm' : 'inches'})</Form.Label>
              <Form.Control
                type="number"
                placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value === '' ? '' : Number(e.target.value))}
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
                onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
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
                onChange={(e) => setTime(e.target.value === '' ? '' : Number(e.target.value))}
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
                onChange={(e) => setSpeed(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-1" controlId="formIncline">
              <Form.Label className="mb-0">Incline (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter incline in percentage"
                value={incline}
                onChange={(e) => setIncline(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </Form.Group>
          </Col>
        </Row>
        {/* No button needed - calculation is automatic */}
      </Form>

      <div className="mt-3 p-3 border rounded">
        {weight ? (
          <>
            <Row>
              <Col>
                <div className="mb-2">
                  <strong>Calories Burned from Walking:</strong>
                  <p className="font-weight-bold">{calories !== null ? calories.toFixed(2) : '0'} calories</p>
                </div>
                <div className="small text-muted">
                  This calculation is based on your weight, walking speed, incline, and time.
                  It uses MET (Metabolic Equivalent of Task) values adjusted for these factors.
                </div>
              </Col>
            </Row>
            <div className="mt-2 small text-muted">
              This is an approximation based on general formulas. Individual results may vary.
              Consult with a healthcare professional for personalized advice.
            </div>
          </>
        ) : (
          <div className="text-center text-muted">
            <p>Please enter your weight to calculate calories burned.</p>
            <p className="small">Weight is required for an accurate calculation.</p>
          </div>
        )}
      </div>
    </Container>
  );
}