import { useState } from "react";
import MessageForm from "./components/MessageForm"
import { Row, Col, Card } from 'react-bootstrap';
import { useMessageClassifier } from "./hooks/useMessageClassifier";


const App: React.FC = () => {
  const [prediction, setPrediction] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Using the custom hook to handle the classification API call
  const { mutate, isLoading } = useMessageClassifier(setPrediction, setError);

  // Function to handle form submission
  const handleSubmit = (message: string) => {
    // Trigger the mutation when form is submitted
    mutate(message);
  };

  return (
    <div className="App mt-5">
      <Row className="justify-content-center">
      <Col md={5}>
        <Card className='mb-4'>
          <Card.Header><h1>SMS Classifier</h1></Card.Header>
          <Card.Body>
            {/* MessageForm component for input */}
            <MessageForm onSubmit={handleSubmit} isLoading={isLoading} />
            {/* Error Handling */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row className="justify-content-center">
      <Col md={5}>
        {prediction && (
          <Card>
            <Card.Header><h3>Result</h3></Card.Header>
            <Card.Body>Prediction: {prediction}</Card.Body>
          </Card>
        )}
      </Col>
    </Row>
    </div>
  );
}

export default App;