import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './eventCard'; // Assuming EventCard is the correct component
import './eventPage.css';

const EventPage = ({ organisationUser, setEvent }) => {
  const [currentTab, setCurrentTab] = useState('current');
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const handleFetchEvents = async () => {
    // alert(organisationUser); 

    try {
      const response = await fetch(`/api/orgevents/${organisationUser}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.events); // Log the fetched events
        setEvents(data.events); // Set events data when the request is successful
        // alert('Events fetched successfully!');
      } else {
        // alert(data.error || "Failed to fetch events. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    //   alert("An error occurred while fetching events. Please try again later.");
    }
  };

  useEffect(() => {
    if (organisationUser) {
      handleFetchEvents();
    }
  }, [organisationUser]);

  const today = new Date();

  // Filter events by current or past using a more reliable date comparison
  const currentEvents = Array.isArray(events) ? events.filter(event => {
    const eventDate = new Date(event.eventDate); // Ensure eventDate is in a proper format
    return eventDate >= today;
  }) : [];

  const pastEvents = Array.isArray(events) ? events.filter(event => {
    const eventDate = new Date(event.eventDate); // Ensure eventDate is in a proper format
    return eventDate < today;
  }) : [];

  const handleAddEvent = () => {
    navigate('/addEvent');
  };

  return (
    <div className="event-page">
      <div className="tabs">
        <button className={currentTab === 'current' ? 'active' : ''} onClick={() => setCurrentTab('current')}>
          Current Events
        </button>
        <button className={currentTab === 'past' ? 'active' : ''} onClick={() => setCurrentTab('past')}>
          Past Events
        </button>
      </div>

      <div className="event-list">
        {(currentTab === 'current' ? currentEvents : pastEvents).length > 0 ? (
          (currentTab === 'current' ? currentEvents : pastEvents).map(event => (
            <EventCard key={event._id} event={event} setEvent={setEvent}/>
          ))
        ) : (
          <p>No events available.</p> // Show a message when there are no events
        )}
      </div>

      {currentTab === 'current' && (
        <button className="add-event-button" onClick={handleAddEvent}>+ Add Event</button>
      )}
    </div>
  );
};

export default EventPage;
