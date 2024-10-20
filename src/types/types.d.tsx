declare global
{
  interface Prediction {
    prediction: string;
    message: string;
  }
  interface MessageFormProps {
    onSubmit: (message: string, model:string) => void;
    isLoading:  boolean;
  }
}
