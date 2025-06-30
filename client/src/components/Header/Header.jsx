import HeaderButton from "../HeaderButton/HeaderButton";
import Sun from "../../assets/icons/Sun";
import Moon from "../../assets/icons/Moon";
import Hamb from "../../assets/icons/Hamb";
import "./Header.css";
function Header({ isDark, setIsDark, toggleSidebar, showToggleBtn }) {
  return (
    <header className="header">
      <div className="left">
        <span>User</span>
      </div>
      <ul className="right">
        <li>
          <HeaderButton
            onClick={() => setIsDark((isDark) => !isDark)}
            className="menuBtn"
          >
            {isDark ? <Sun /> : <Moon />}
          </HeaderButton>
        </li>
        <li>
          {showToggleBtn && (
            <HeaderButton
              className={`menuBtn ${showToggleBtn ? "visible" : ""}`}
              onClick={toggleSidebar}
            >
              <Hamb />
            </HeaderButton>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
