import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./UI/Components/LandingPage/landingPage";
import AboutInfo from './UI/Components/NGO/about';
import AddEvent from './UI/Components/NGO/addEvent';
import DynamicListInput from './UI/Components/NGO/dynamicList';
import ImageUploader from './UI/Components/NGO/uploader';
import DonationTable from './UI/Components/NGO/viewDonation';
import EventPage from './UI/Components/NGO/EventPage';
import EventDetails from './UI/Components/NGO/eventDetails';
import VolunteerListPage from './UI/Components/NGO/VolunteerList';
import Navbar from './UI/Components/SideNav/sideNav';
import SponsorListPage from './UI/Components/NGO/sponsorList';

function App() {
  const location=useLocation();
  const shouldShowSideNav= !['/about'].includes(location.pathname);
  return (
    <div className="app-container">
      {shouldShowSideNav&&<div className='sideNav'>
        <Navbar/>
      </div>
}
      <div className="content-container">
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/about" element={<AboutInfo/>}/>
          <Route path="/addEvent" element={<AddEvent/>}/>
          <Route path="/Dynamiclist" element={<DynamicListInput/>}/>
          <Route path="/uploader" element={<ImageUploader/>}/>
          <Route path="/donation" element={<DonationTable/>}/>
          <Route path="/eventPage" element={<EventPage/>}/>
          <Route path='/event/:eventId' element={<EventDetails/>}/>
          <Route path="/event/:eventId/volunteers" element={<VolunteerListPage />} />
          <Route path="/event/:eventId/sponsors" element={<SponsorListPage />} />

          
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
