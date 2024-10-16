// Function to classify a message by sending it to the backend API
export const classifyMessage = async (message: string) => {
    // Make a POST request to the Django backend API at the specified endpoint
    const response = await fetch('http://localhost:8000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to classify the message');
    }
    
    // If the request is successful, return the parsed JSON response
    return response.json();
  };