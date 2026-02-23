import React from "react";
import { Link } from "react-router-dom";

const Master = () => {
    return (
        <div className="glass-container">
            <h1 style={{ marginBottom: "0.5rem" }}> Data Hub</h1>
            <p style={{ marginBottom: "2rem" }}>DASHBOARD THAT CONTAINS ALL ESSENTIAL TOOLS</p>

            <nav className="nav-links">
                <Link to="/temperature">🌤️ Weather update</Link>
                <Link to="/population">👥 Population</Link>
                <Link to="/education">🎓 Education Institution</Link>
                <Link to="/water">💧 Water Resourse</Link>
                <Link to="/recipe">🍳 Recipes</Link>
            </nav>

            <div style={{ marginTop: "2rem", opacity: 0.8 }}>
                <p>Select a tool above to get started.</p>
            </div>
        </div>
    );
};

export default Master;