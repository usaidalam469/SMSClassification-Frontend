import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

interface MessageFormProps {
    onSubmit: (message: string, model:string) => void;
    isLoading:  boolean;
  }

const MessageForm: React.FC<MessageFormProps>= ({ onSubmit,isLoading }) => {
    const [message, setMessage] = useState<string>('');
    const [model, setModel] = useState<string>('');
  
    // Handle form submission
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      // Pass the message to the parent component
      onSubmit(message, model); 
      // Clear the form after submission
      setMessage('');  
      setModel('');  
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <Form.Label htmlFor="message">Enter Message</Form.Label>
            <Form.Control
                type="text"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                required
            />
            <Form.Label htmlFor="model" className='mt-3' >Select model:</Form.Label>
            <Form.Select id='model' value={model} onChange={(e) => setModel(e.target.value)} aria-label="Default select example">
              <option>Select Model</option>
              <option value="nb_model">Multinomial Naive Bayes</option>
              <option value="rf_model">Random Forest Classifier</option>
              <option value="lr_model">Logistic Regression</option>
            </Form.Select>
            <Button
                type='submit'
                className='mt-3 float-end'
                variant="primary"
                disabled={isLoading}
                aria-busy={isLoading}
            >
                {isLoading ? <Spinner animation="border" size="sm" /> : "Classify"}
            </Button>
      </form>
    );
  }
export default MessageForm