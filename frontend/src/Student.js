// frontend/src/Student.js

import React, { useEffect, useState } from "react";
import axios from "axios";

function Student() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        console.log("Response from server:", res.data);
        setStudents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.ID}>
            Name: {student.Name}, Email: {student.Email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Student;
