// components/CafeDetail/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="pt-24 text-center text-red-500">{message}</div>;
}

export default ErrorMessage;
