import { useMutation } from 'react-query';
import { classifyMessage } from '../services/messageService';

import { Prediction } from '../App';
// Custom hook that uses React Query's useMutation hook to handle message classification
// It accepts two setter functions: setPrediction and setError, which are used to update the state
export const useMessageClassifier = (setPrediction: React.Dispatch<React.SetStateAction<Prediction | null>>, 
    setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    // useMutation hook is used to manage asynchronous tasks, in this case, calling the classifyMessage function (API call)
    return useMutation(({ message, model }: { message: string; model: string }) => classifyMessage(message, model), {
    onSuccess: (data) => {
      setPrediction(data);
      setError(null);
    },
    onError: () => {
      setError('Failed to fetch the prediction');
      setPrediction(null);
    }
  });
};