import {useState, useEffect, useContext, memo} from 'react';
import Form from 'react-bootstrap/cjs/Form';
import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col_ from "react-bootstrap/cjs/Col";
import {ProductContext} from "~/routes/walk/context";
const Col = Col_.default || Col_

// Define types for better type safety
type UnitSystem = 'metric' | 'imperial';
type NumberOrEmpty = number | '';

// Unit conversion functions
const convertToMetric = {
  weight: (lbs: number): number => lbs * 0.453592, // lbs to kg
  speed: (mph: number): number => mph * 1.60934, // mph to km/h
};

const convertToImperial = {
  weight: (kg: number): number => kg / 0.453592, // kg to lbs
  speed: (kmh: number): number => kmh / 1.60934, // km/h to mph
};

export default function WalkingCalorieCalculator() {
  const {isFiltered, isCompareMode} = useContext(ProductContext)
  if (isFiltered || isCompareMode) { return null; }
  return <WalkingCalorieCalculator_ />
}

const WalkingCalorieCalculator_ = memo(() => {
  const [unit, setUnit] = useState<UnitSystem>('imperial');
  // Age is not used in MET-based walking calorie calculations
  // Gender is not used in MET-based walking calorie calculations
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

  // Calculate calories burned from walking
  const calculateWalkingCalories = (): number => {
    const weightValue = parseNumeric(weight);
    const speedValue = parseNumeric(speed);
    const inclineValue = parseNumeric(incline);
    const timeValue = parseNumeric(time);

    // Input validation
    if (weightValue <= 0) return 0;

    // Convert to metric if using imperial
    const weightInKg = unit === 'imperial' ? convertToMetric.weight(weightValue) : weightValue;
    const speedInKmh = unit === 'imperial' ? convertToMetric.speed(speedValue) : speedValue;

    // MET value calculation based on speed and incline
    // MET = Metabolic Equivalent of Task, 1 MET = 1 kcal/kg/hour at rest
    let met = 2.0; // Base MET for very slow walking

    // Adjust MET based on speed (km/h) - more granular scale
    if (speedInKmh < 3.2) {
      met = 2.0; // Very slow walking
    } else if (speedInKmh < 4.0) {
      met = 2.8; // Slow walking
    } else if (speedInKmh < 4.8) {
      met = 3.0; // Moderate walking
    } else if (speedInKmh < 5.6) {
      met = 3.5; // Brisk walking
    } else if (speedInKmh < 6.4) {
      met = 4.3; // Very brisk walking
    } else if (speedInKmh < 7.2) {
      met = 5.0; // Fast walking
    } else if (speedInKmh < 8.0) {
      met = 6.0; // Very fast walking
    } else if (speedInKmh < 8.8) {
      met = 7.0; // Extremely fast walking / slow jogging
    } else {
      met = 8.0; // Fast walking / jogging
    }

    // Adjust MET for incline (research-based adjustment)
    // Each 1% of incline increases MET by about 10%
    const inclineMultiplier = 1 + (inclineValue * 0.1);
    met *= inclineMultiplier;

    // Calculate calories: MET * weight in kg * time in hours
    return met * weightInKg * timeValue;
  };

  // Calculate calories whenever inputs change
  useEffect(() => {
    const calculatedCalories = calculateWalkingCalories();
    setCalories(calculatedCalories);
  }, [weight, speed, incline, time, unit]);

  return <Container>
    <h4 className="text-center">Walking Calorie Calculator</h4>
    <p className="text-center text-muted">Calculate how many calories you can burn while using a walking pad. This adds to
      your <a href="https://www.calculator.net/tdee-calculator.html" target="_blank">TDEE</a> (Total Daily Energy
      Expenditure).
    </p>
    <Form className='mt-1'>
      {/* Age, Gender, and Height fields removed - not used in MET-based walking calorie calculations */}
      
      {/* First row - Units and Weight side by side */}
      <Row className="mb-2">
        <Col md={1} sm={0}></Col>
        <Col md={2}>
          <Form.Group controlId="formUnits">
            <Form.Label className="mb-0">Units</Form.Label>
            <Form.Select
              value={unit}
              onChange={(e) => setUnit(e.target.value as UnitSystem)}
            >
              <option value="imperial">Imperial</option>
              <option value="metric">Metric</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="formWeight">
            <Form.Label className="mb-0">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</Form.Label>
            <Form.Control
              type="number"
              placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="formTime">
            <Form.Label className="mb-0">Time (hours)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter time"
              value={time}
              onChange={(e) => setTime(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="formSpeed">
            <Form.Label className="mb-0">Speed ({unit === 'metric' ? 'km/h' : 'mph'})</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter speed"
              value={speed}
              onChange={(e) => setSpeed(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group controlId="formIncline">
            <Form.Label className="mb-0">Incline (%)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter incline"
              value={incline}
              onChange={(e) => setIncline(e.target.value === '' ? '' : Number(e.target.value))}
            />
          </Form.Group>
        </Col>
        <Col md={1} sm={0}></Col>
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
})