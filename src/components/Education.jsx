import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Education = () => {
  const [city, setCity] = useState("");
  const [institutions, setInstitutions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchInstitutions = async () => {
    if (!city.trim()) return setError("Enter city");

    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `http://localhost:5000/api/education?city=${city}`
      );

      setInstitutions(res.data);
    } catch {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-container">
      <Link to="/" className="back-home">← Home</Link>

      <h1>Education Finder</h1>

      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city (e.g., Chennai)"
      />

      <button onClick={fetchInstitutions}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && <p>{error}</p>}

      <ul>
        {institutions.map((i, idx) => (
          <li key={idx}>
            <strong>{i.tags?.name || "Unnamed"}</strong>
            <small> {i.tags?.amenity}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Education;
