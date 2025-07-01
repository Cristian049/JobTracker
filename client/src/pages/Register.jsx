import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Register.module.css";
function Register({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        formData
      );
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/jobs");
    } catch (e) {
      console.error(e.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img src="/logo.png" alt="" />
        </div>
        <h3>Register your account </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formElements}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formElements}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formElements}>
            <label htmlFor="password">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formElements}>
            <span className={styles.noaccount}>
              Already have an account?{" "}
              <NavLink to="/login" className={styles.register}>
                Login
              </NavLink>
            </span>
          </div>
          <div className={styles.formElements}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
