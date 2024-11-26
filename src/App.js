import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./UI/Components/LandingPage/landingPage.jsx";
import EventPage from "./UI/Components/EventPage/eventPage.jsx";
import SideNav from "./UI/Components/SideNav/sideNav.jsx";
import ProductPage from "./UI/Components/BuyProductsPage/products.jsx";
import AboutPage from "./UI/Components/NonProfitAboutPage/aboutPage.jsx";
import ViewEventPage from "./UI/Components/ViewEventsPage/viewEvent.jsx";
import VolunteerForm from "./UI/Components/VolunteerForm/volunteerForm.jsx";
import SponsorForm from "./UI/Components/SponsorForm/sponsorForm.jsx";


function App() {
  const location = useLocation(); 
  const shouldShowSideNav = !['/'].includes(location.pathname);
  const shouldShowLogo = !['/'].includes(location.pathname);
  const [showEvent, setShowEvent]=useState(null);
  const [showNonprofit, setShowNonprofit] =useState(null);
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
          <Route path="/events" element={<EventPage setShowEvent={setShowEvent}/>}/>
          <Route path="/products" element={<ProductPage/>}/>
          <Route path="/about" element={<AboutPage showNonprofit={showNonprofit}/>}/>
          <Route path="/view" element={<ViewEventPage showEvent={showEvent} setShowNonprofit={setShowNonprofit}/>}/>
          <Route path="/volunteer" element={<VolunteerForm showEvent={showEvent}/>}/>
          <Route path="/sponsor" element={<SponsorForm showEvent={showEvent}/>}/>
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
