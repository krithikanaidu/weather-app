import React from "react";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation
import "./Forecast.css";
import back from "../assets/back.png"; 
import { useNavigate } from "react-router-dom"; 

const Forecast = () => {
  const location = useLocation();
  const forecastData = location.state?.forecast || []; // ✅ Get forecast data
  const navigate = useNavigate(); // ✅ Hook for navigation

  return (
    <div className="forecast">
      <div className="forecast-container">
        <h2 className="header_forecast">3-Day Forecast</h2>
        <div className="forecast-list">
          <br />
          {forecastData.length > 0 ? (
            forecastData.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>{new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}</p>
                <img src={day.day.condition.icon} alt="weather icon" />
                <p>{day.day.avgtemp_c}°C</p>
              </div>
            ))
          ) : (
            <p>No forecast data available</p>
          )}
        </div>
        <div className="back_home">
          <img
            src={back}
            alt="redirect_home"
            className="redirect_home"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
            onClick={() => navigate("/")} // ✅ Navigate back to the main weather page
          />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
