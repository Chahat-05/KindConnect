import { React, useEffect, useState } from "react";
import "./viewEvent.css";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";

export const ViewEventPage = ({ showEvent, setShowNonprofit, username }) => {
    const navigate = useNavigate();
    if (!showEvent) {
        return <div>Loading...</div>; 
    }
    

    // Extract the dynamic data
    const {
        id,
        organisationName,
        orgImage,
        eventTitle,
        eventDate,
        eventTime,
        eventLocation,
        eventDescription,
        sponsorList,
        volunteerList,
        logo
    } = showEvent;

    const details = `
📅 **Date**: ${eventDate} 

⏰ **Time**: ${eventTime}

📍 **Location**: ${eventLocation}
`;

    const description = `#  ${eventTitle}
${eventDescription}
`;

    // Handle the click event on the organisation name
    const handleOrganisationClick = () => {
        setShowNonprofit(organisationName); // Set the organisation name when clicked
        navigate("/about");
    };

    return (
        <div id="viewEventMain">
            <div
                id="colorText1"
                onClick={handleOrganisationClick} // Add onClick handler here
            >  <img src={orgImage} alt="Logo" />
                {organisationName}
                <img src={logo} alt={`${organisationName} logo`} />
            </div>
            <div id="textMain">
                <div id="eventDescription">
                    <ReactMarkdown>{description}</ReactMarkdown>
                </div>
                <div id="eventDetails">
                    <ReactMarkdown>{details}</ReactMarkdown>
                    <div id="eventButtons"></div>
                </div>
                <div id="moreDetails">
                    <h2>Sponsors Required:</h2>
                    <ul>
                        {sponsorList.map((sponsorship, index) => (
                            <li key={index}>{sponsorship}</li>
                        ))}
                    </ul>
                    <button onClick={()=>{navigate('/sponsor')}}>Sponsor this Event</button>
                    <h2>Volunteers Required:</h2>
                    <ul>
                        {volunteerList.map((volunteer, index) => (
                            <li key={index}>{volunteer}</li>
                        ))}
                    </ul>
                    <button onClick={()=>{navigate('/volunteer')}}>Become a Volunteer</button>
                </div>
            </div>
        </div>
    );
};

export default ViewEventPage;
