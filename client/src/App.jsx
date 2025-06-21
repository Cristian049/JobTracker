import React, { useEffect, useState } from "react";

function App() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setJobs(data))
      .catch((err) => console.error("Eroare la fetch:", err));
  }, []);

  return (
    <div>
      <h1>Job-uri aplicate</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.company} - {job.position}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
