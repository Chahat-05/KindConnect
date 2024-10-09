import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./UI/Components/LandingPage/landingPage";


function App() {
  return (
    <div className="app-container">
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return(
    <Router>
      <App/>
    </Router>
  );
}
