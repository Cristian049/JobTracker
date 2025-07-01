import HeaderButton from "../HeaderButton/HeaderButton";
import Sun from "../../assets/icons/Sun";
import Moon from "../../assets/icons/Moon";
import Hamb from "../../assets/icons/Hamb";
import "./Header.css";
import Account from "../../assets/icons/Account";
import Logout from "../../assets/icons/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Header({
  isDark,
  setIsDark,
  toggleSidebar,
  showToggleBtn,
  setIsLoggedIn,
}) {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/logout",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="header">
      <div className="left">
        <span>User</span>
      </div>
      <ul className="right">
        <li>
          <HeaderButton className="menuBtn">
            <Account />
          </HeaderButton>
        </li>
        <li>
          <HeaderButton
            onClick={() => setIsDark((isDark) => !isDark)}
            className="menuBtn"
          >
            {isDark ? <Sun /> : <Moon />}
          </HeaderButton>
        </li>
        <li>
          <HeaderButton className="menuBtn" onClick={handleLogout}>
            <Logout />
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
