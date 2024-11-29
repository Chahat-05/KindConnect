import React from 'react';
import { useNavigate } from 'react-router-dom';
import './eventPage.css';

const EventCard = ({ event, setEvent }) => {
  const navigate = useNavigate();

  return (
    <div className="event-card" onClick={()=>{setEvent(event);navigate('/display')}}>
      <img src={event.eventLogo} alt="Event" className="event-card-image" />
      <h3>{event.eventTitle}</h3>
      <p>{event.eventDescription.slice(0, 100)}...</p> {/* Shows first 100 characters */}
    </div>
  );
};

export default EventCard;