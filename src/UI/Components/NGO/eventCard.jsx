import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventPage.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const navigateToEventDetails = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="event-card" onClick={navigateToEventDetails}>
      <img src={event.image} alt="Event" className="event-card-image" />
      <h3>{event.title}</h3>
      <p>{event.description.slice(0, 100)}...</p> {/* Shows first 100 characters */}
    </div>
  );
};

export default EventCard;
