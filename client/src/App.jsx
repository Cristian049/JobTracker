import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login";
import JobList from "./pages/JobList";
import PrivateRoute from "./pages/PrivateRoute";
import AddJob from "./pages/AddJob";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./components/AppLayout";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isJobLoading, setIsJobLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useDarkMode();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setErrorMessage("");
        setIsJobLoading(true);
        const res = await fetch("http://localhost:5000/api/jobs", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Eroare la fetch:", err);
        setErrorMessage(err.message);
      } finally {
        setIsJobLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="login"
          element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route
          path="/"
          element={
            <AppLayout
              isDark={isDark}
              setIsDark={setIsDark}
              isJobLoading={isJobLoading}
              errorMessage={errorMessage}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        >
          <Route
            index
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                isUserLoading={isUserLoading}
              >
                <Navigate to="/jobs" replace />
              </PrivateRoute>
            }
          />

          <Route
            path="jobs"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                isUserLoading={isUserLoading}
              >
                <JobList />
              </PrivateRoute>
            }
          />

          <Route
            path="jobs/new"
            element={
              <PrivateRoute
                isLoggedIn={isLoggedIn}
                isUserLoading={isUserLoading}
              >
                <AddJob />
              </PrivateRoute>
            }
          />

          {/* <Route path="jobs/:id" element={<JobDetails />} />
          <Route path="jobs/:id/edit" element={<JobEdit />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
