import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const GenderPopulation = () => {
    const [country, setCountry] = useState("");
    const [stateName, setStateName] = useState(""); // ✅ NEW
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const countryMap = {
        INDIA: "IN",
        USA: "US",
        AMERICA: "US",
        UK: "GB",
        "UNITED KINGDOM": "GB",
        JAPAN: "JP",
        CHINA: "CN",
        RUSSIA: "RU",
        BRAZIL: "BR",
        AUSTRALIA: "AU",
        CANADA: "CA",
        GERMANY: "DE",
        FRANCE: "FR"
    };

    const getPopulation = async () => {
        if (!country.trim()) {
            setError("Please enter a country name or code");
            return;
        }

        setError("");
        setData(null);
        setLoading(true);

        const inputCountry = country.toUpperCase();
        const apiCode = countryMap[inputCountry] || inputCountry;

        try {
            const [maleRes, femaleRes] = await Promise.all([
                axios.get(
                    `https://api.worldbank.org/v2/country/${apiCode}/indicator/SP.POP.TOTL.MA.IN`,
                    { params: { format: "json", per_page: 1 } }
                ),
                axios.get(
                    `https://api.worldbank.org/v2/country/${apiCode}/indicator/SP.POP.TOTL.FE.IN`,
                    { params: { format: "json", per_page: 1 } }
                )
            ]);

            const maleValue = maleRes.data?.[1]?.[0]?.value;
            const femaleValue = femaleRes.data?.[1]?.[0]?.value;

            if (!maleValue || !femaleValue) {
                throw new Error("Data not available");
            }

            setData({ male: maleValue, female: femaleValue });
        } catch (err) {
            setError("Invalid country name or code. Try standard codes (e.g., US, IN, JP).");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-container">
            <Link to="/" className="back-home">← Home  </Link>

            <h1>Demographics</h1>
            <p>Compare male and female population (country level)</p>

            {/* Country Input */}
            <input
                type="text"
                placeholder="Country (e.g., India, US, JP)"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />

            {/* State Input (UI only) */}
            <input
                type="text"
                placeholder="State (optional – UI only)"
                value={stateName}
                onChange={(e) => setStateName(e.target.value)}
                style={{ marginTop: "0.8rem" }}
            />

            <button className="get-data-btn" onClick={getPopulation} disabled={loading}>
                {loading ? "Loading..." : "Get Data"}
            </button>

            {loading && <div className="loader"></div>}
            {error && <div className="error-message">{error}</div>}

            {data && (
                <div style={{ marginTop: "2rem" }}>
                    <p style={{ marginBottom: "1rem", opacity: 0.9 }}>
                        📍 Location: <b>{country.toUpperCase()}</b>
                        {stateName && <> → <b>{stateName}</b></>}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                            gap: "2rem"
                        }}
                    >
                        <div>
                            <h2 style={{ color: "#4facfe" }}>
                                {data.male.toLocaleString()}
                            </h2>
                            <p className="info-text">Male Population</p>
                        </div>

                        <div>
                            <h2 style={{ color: "#ff9a9e" }}>
                                {data.female.toLocaleString()}
                            </h2>
                            <p className="info-text">Female Population</p>
                        </div>
                    </div>

                    <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", opacity: 0.7 }}>
                        ⚠️ State-wise population is not available via World Bank API.
                        Data shown is country-level.
                    </p>
                </div>
            )}
        </div>
    );
};

export default GenderPopulation;
