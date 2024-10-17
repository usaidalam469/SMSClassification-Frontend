import { useState } from "react";
import MessageForm from "./components/MessageForm"
import { Row, Col, Card } from 'react-bootstrap';
import { useMessageClassifier } from "./hooks/useMessageClassifier";
import './App.css'
export interface Prediction {
  prediction: string;
  message: string;
}

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction| null>(null);
  const [error, setError] = useState<string | null>(null);

  // Using the custom hook to handle the classification API call
  const { mutate, isLoading } = useMessageClassifier(setPrediction, setError);

  // Function to handle form submission
  const handleSubmit = (message: string, model:string) => {
    // Trigger the mutation when form is submitted
    mutate({message,model});
  };

  return (
    <div className="App mt-5">
      <Row className="justify-content-center">
      <Col md={5}>
        <Card className='mb-4'>
          <Card.Header className="d-flex justify-content-center theme"><h1>SMS Classifier</h1></Card.Header>
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
            <Card.Header className=" d-flex justify-content-center theme"><h3>Result</h3></Card.Header>
            <Card.Body>
            <b>Message</b>: {prediction.message}
            <br />
            <b>Prediction</b>: {prediction.prediction}
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
    </div>
  );
}

export default App;