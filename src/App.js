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
import PostProductForm from "./UI/Components/PostProductPage/postProduct.jsx";
import LoginSignUp from "./UI/Components/LoginSignUpPage/loginSignUp.jsx";
import Organisations from "./UI/Components/AllOrganisations/organisations.jsx";
import ViewDonation from "./UI/Components/ViewDonation/viewDonation.jsx";
import OrgSideNav from "./UI/Components/OrgNavBar/orgnavBar.jsx";
import OrgLogin from "./UI/Components/OrganisationLogIn/login.jsx";
import OrgEvents from "./UI/Components/OrgEvents/eventPage.jsx";
import Profile from "./UI/Components/Profile/profile.jsx";
import Register from "./UI/Components/RegisterNGO/register.jsx";
import AddEvent from "./UI/Components/AddEvent/addEvent.jsx";
import DisplayEvent from "./UI/Components/DisplayEvents/eventDetails.jsx";
import Volunteers from "./UI/Components/Volunteers/volunteer.jsx";
import Sponsors from "./UI/Components/Sponsors/sponsors.jsx";

function App() {
  const location = useLocation(); 
  const [showEvent, setShowEvent] = useState(null);
  const [showNonprofit, setShowNonprofit] = useState(null);
  const [username, setUsername] = useState('');
  const [organisationUser, setOrganisationUser]=useState('');
  const [event, setEvent]=useState();

  // Determine whether to show SideNav or OrgSideNav
  const sideNavRoutes = ["/events", "/products", "/view","/about","/volunteer","/sponsor","/post","/organisations"];
  const orgSideNavRoutes = ["/donation","/orgEvents","/profile","/addEvent","/display","/volunteers","/sponsors"];
  
  const shouldShowSideNav = sideNavRoutes.includes(location.pathname);
  const shouldShowOrgSideNav = orgSideNavRoutes.includes(location.pathname);
  const shouldShowLogo = !['/', '/login-signup','/register'].includes(location.pathname);

  return (
    <div className="app-container"> 
      {shouldShowLogo && (
        <div id="app-header" style={{ background: "white" }}> 
          <div id="appLogo"></div>
          <div id="userlogo">
            <box-icon type='solid' name='user-circle'></box-icon>
            <div>{username || organisationUser}</div>
          </div>
        </div>
      )}
      <div id="main-container"> 
        {/* Conditional Navbar Rendering */}
        {shouldShowSideNav && <div id="navbar"><SideNav/></div>}
        {shouldShowOrgSideNav && <div id="navbar"><OrgSideNav/></div>}

        <div className="content-container">
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/events" element={<EventPage setShowEvent={setShowEvent} username={username}/>}/>
            <Route path="/products" element={<ProductPage username={username}/>}/>
            <Route path="/about" element={<AboutPage showNonprofit={showNonprofit} username={username}/>}/>
            <Route path="/view" element={<ViewEventPage showEvent={showEvent} setShowNonprofit={setShowNonprofit}/>}/>
            <Route path="/volunteer" element={<VolunteerForm showEvent={showEvent}/>}/>
            <Route path="/sponsor" element={<SponsorForm showEvent={showEvent}/>}/>
            <Route path="/post" element={<PostProductForm/>}/>
            <Route path="/login-signup" element={<LoginSignUp setUsername={setUsername}/>}/>
            <Route path="/organisations" element={<Organisations setShowNonprofit={setShowNonprofit}/>}/>
            <Route path="/donation" element={<ViewDonation organisationUser={organisationUser}/>}/>
            <Route path="/login" element={<OrgLogin setOrganisationUser={setOrganisationUser}/>}/>
            <Route path="/orgEvents" element={<OrgEvents organisationUser={organisationUser} setEvent={setEvent}/>}/>
            <Route path="/profile" element={<Profile organisationUser={organisationUser}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/addEvent" element={<AddEvent organisationUser={organisationUser}/>}/> 
            <Route path="/display" element={<DisplayEvent event={event}/>}/> 
            <Route path="/volunteers" element={<Volunteers event={event}/>}/> 
            <Route path="/sponsors" element={<Sponsors event={event}/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App/>
    </Router>
  );
}
