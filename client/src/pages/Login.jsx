import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Login({ setIsLoggedIn }) {
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
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
