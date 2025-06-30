import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./Content.css";
export default function Content({ children }) {
  const isLoader = children?.type === Loader;
  const isError = children?.type === ErrorMessage;
  const isCentered = isLoader || isError;
  return (
    <div className="content">
      <div className={isCentered ? "centered-full" : ""}>{children}</div>
    </div>
  );
}
