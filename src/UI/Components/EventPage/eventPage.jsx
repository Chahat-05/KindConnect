import { React, useState, useEffect } from "react";
import "./eventPage.css";
import EventCard from "./eventCard";
import { useNavigate } from "react-router-dom";

export const EventPage = ({ setShowEvent }) => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/events"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const eventData = await response.json();
                setEvents(eventData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleCardClick = (eventData) => {
        setShowEvent(eventData); // Update state with the clicked event data
        navigate("/view");
    };

    return (
        <div id="eventPageMain">
            {events.length > 0 ? (
                events.map((eventData, index) => (
                    <EventCard
                        key={index}
                        organisation={eventData.organisationName}
                        event={eventData.eventTitle}
                        descriptionPreview={
                            eventData.eventDescription.length > 50
                                ? eventData.eventDescription.slice(0, 100) + "..."
                                : eventData.eventDescription
                        }
                        onClick={() => handleCardClick(eventData)} // Pass the click handler
                    />
                ))
            ) : (
                <p>Loading events...</p>
            )}
        </div>
    );
};

export default EventPage;
