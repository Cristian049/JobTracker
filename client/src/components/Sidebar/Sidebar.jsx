import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({ isOpen, isMobile }) => {
  const sidebarClass = isMobile
    ? `sidebar ${isOpen ? "open" : ""}`
    : `sidebar ${isOpen ? "" : "closed"}`;

  return (
    <aside
      className={sidebarClass}
      style={{
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <div className="logo">
        <img src="images/logo-waste.webp" alt="logo-waste" />
      </div>
      <nav className="nav">
        <li className="nav-link">
          <NavLink to="/jobs">Jobs</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/jobs/new">Add Job</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/statistics">Statistics</NavLink>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
