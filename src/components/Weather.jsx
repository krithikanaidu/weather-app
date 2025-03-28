import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy.png';
import sunny from '../assets/Sunny.png';
import windy from '../assets/windy.png';
import cloudy_night from '../assets/cloudynight.png';
import night from '../assets/Night.png';
import partlycloudy from '../assets/partlycloudy.png';
import windspeed from '../assets/windspeed.png';
import humidity from '../assets/humidity.png';
import snowy from '../assets/snowy.png';
import thunderstrom from '../assets/thunderstrom.png';
import snowfall from '../assets/snowfall.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "1000": sunny,
    "1003": partlycloudy,
    "1006": cloudy,
    "1195": rainy,
    "1213": snowy,
    "1222": snowfall,
    "1282": thunderstrom,
    "1009": cloudy_night,
    "1030": night,
    "1135": windy,
  };

  const search = async (city) => {
    if (!city) {
      alert(" Whoa there, chief! You forgot to enter a city. Drop a name and let's vibe with the weather!");
      return;
    }
    try {
      const BASE_URL = "http://api.weatherapi.com/v1";
      const API_KEY = import.meta.env.VITE_APP_ID; // Use .env API key
      if (!API_KEY) {
        alert("API Key is missing. Please set VITE_APP_ID in your environment variables.");
        return;
      }

      const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`;
      const response = await fetch(url);
      const data = await response.json();

      console.log("Parsed Data:", data);

      if (data.error) {
        console.error("API Error:", data.error.message);
        return;
      }

      const icon = allIcons[data.current.condition.code] || sunny;

      setWeatherData({
        humidity: data.current.humidity,
        wind_speed: data.current.wind_kph,
        temperature: data.current.temp_c,
        location: data.location.name,
        icon: icon,
        time: data.location.localtime,
        local_time: data.location.localtime.split(" ")[1],
      });
    } catch (error) {
      setWeatherData(false);
      alert("Error fetching weather data:", error);
    }
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input 
          ref={inputRef} 
          type="text" 
          placeholder="Search" 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search(inputRef.current.value);
            }
          }}
        />
        <img 
          src={search_icon} 
          alt="search_icon" 
          onClick={() => search(inputRef.current.value)} 
        />
      </div>

      {weatherData && weatherData.temperature !== undefined ? (
        <>
          <div className="local-time">
            <p>{weatherData.time}</p>
          </div>
          <img src={weatherData.icon} alt="Weather Icon" className='weather-icon'/>
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity} alt="" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={windspeed} alt="" />
              <div>
                <p>{weatherData.wind_speed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
