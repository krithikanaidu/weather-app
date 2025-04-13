import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Weather from './components/weather';
import Forecast from "./components/Forecast";

const App = () => {
  return (
    <div className="app">
      <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/forecast" element={<Forecast />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
