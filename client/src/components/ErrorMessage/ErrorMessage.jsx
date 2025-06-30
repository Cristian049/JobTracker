import "./ErrorMessage.css";

export default function ErrorMessage({ message }) {
  return <h1 className="error">{message}</h1>;
}
