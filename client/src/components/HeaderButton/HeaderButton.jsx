import "./HeaderButton.css";
export default function HeaderButton({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
