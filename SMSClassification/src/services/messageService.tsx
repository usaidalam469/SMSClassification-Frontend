// Function to classify a message by sending it to the backend API
export const classifyMessage = async (message: string, model:string) => {
    // Make a POST request to the Django backend API at the specified endpoint
    const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message,model }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to classify the message');
    }
    
    // If the request is successful, return the parsed JSON response
    return response.json();
  };