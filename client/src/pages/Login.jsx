import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css";
function Login({ setIsLoggedIn, setUser }) {
  const [formData, setFormData] = useState({
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
        `${import.meta.env.VITE_API_URL}/login`,
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
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
        <h3>Log in to your account </h3>
        <form onSubmit={handleSubmit} className={styles.form}>
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
              Don't have an account?{" "}
              <NavLink to="/register" className={styles.register}>
                Register
              </NavLink>
            </span>
          </div>
          <div className={styles.formElements}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
