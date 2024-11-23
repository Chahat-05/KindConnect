import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./UI/Components/LandingPage/landingPage";
import EventPage from "./UI/Components/EventPage/eventPage";
import SideNav from "./UI/Components/SideNav/sideNav";
import ProductPage from "./UI/Components/BuyProductsPage/products";
import AboutPage from "./UI/Components/NonProfitAboutPage/aboutPage";
import ViewEventPage from "./UI/Components/ViewEventsPage/viewEvent";


function App() {
  const location = useLocation(); 
  const shouldShowSideNav = !['/'].includes(location.pathname);
  const shouldShowLogo = !['/'].includes(location.pathname);
  return (
    <div className="app-container"> 
      {shouldShowLogo &&(<div id="app-header">
        <div id="appLogo"></div>
        <div id="userlogo">
          <box-icon type='solid' name='user-circle'></box-icon>
          <div>username</div>
          </div></div>)}
      <div id="main-container">
      {shouldShowSideNav && (<div id="navbar"><SideNav/></div>)}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/events" element={<EventPage/>}/>
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/view" element={<ViewEventPage/>}/>
        </Routes>
      </div>
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
