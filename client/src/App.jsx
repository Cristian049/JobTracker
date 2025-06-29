import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobList from "./pages/JobList";
import PrivateRoute from "./pages/PrivateRoute";
import AddJob from "./pages/AddJob";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch("http://localhost:5000/api/jobs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        setIsLoggedIn(!!token);
        setJobs(data);
      } catch (err) {
        console.error("Eroare la fetch:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/jobs" />} />
        <Route
          path="register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/jobs"
          element={
            <PrivateRoute>
              <JobList />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="new"
          element={
            <PrivateRoute>
              <AddJob />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
