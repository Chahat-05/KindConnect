import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DynamicList from './dynamicList';  // Import your pre-existing DynamicList component
import { useNavigate } from 'react-router-dom';
import "./eventDetails.css";
import ReactMarkdown from "react-markdown";

const EventDetails = ({event}) => {
  const navigate=useNavigate()
  // const { eventId } = useParams();

  // const event = dummyEvents.find(e => e.id === parseInt(eventId));

 
  // Convert the event date to a Date object for comparison
  const eventDate = new Date(event.eventDate);
  const currentDate = new Date();

  const isPastEvent = eventDate < currentDate;  // Check if the event is in the past

  const [eventData, setEventData] = useState(event);
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(event.eventDescription);
  const [tempDate, setTempDate] = useState(event.eventDate);
  const [tempVolunteers, setTempVolunteers] = useState(event.volunteerList);
  const [tempSponsors, setTempSponsors] = useState(event.sponsorList);

  useEffect(() => {
    // const newEvent = dummyEvents.find(e => e.id === parseInt(eventId));
    // alert(JSON.stringify(event));
    if (event) {
      setEventData(event);
      setTempDescription(event.eventDescription);
      setTempDate(event.eventDate);
      setTempVolunteers(event.volunteerList);
      setTempSponsors(event.sponsorList);
    }
  }, [event]);
  if (!event) {
    return <div>Event not found</div>;
  }

  const saveChanges = () => {
    setEventData({
      ...eventData,
      eventDescription: tempDescription,
      eventDate: tempDate,
      volunteerList: tempVolunteers,
      sponsorList: tempSponsors,
    });
    setIsEditing(false);
  };

  const handleViewVolunteers = () => {
    navigate(`/volunteers`);
  };

  const handleViewSponsors = () => {
    navigate(`/sponsors`);
  };

  return (
    <div className="event-details-page">
      <h2>{event.eventTitle}</h2>
      <img className="eventImage" src={event.eventLogo} alt={eventData.title} />
  
      <div>
        <h3>Description</h3>
        <p>
          {isEditing ? (
            <textarea value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} />
          ) : (
            <ReactMarkdown>{event.eventDescription}</ReactMarkdown>
          )}
        </p>
      </div>
  
      <div>
        <h3>Date</h3>
        <p>
          {isEditing ? (
            <input type="date" value={tempDate} onChange={(e) => setTempDate(e.target.value)} />
          ) : (
            event.eventDate
          )}
        </p>
      </div>
  
      <div>
        <h3>Volunteer Categories</h3>
        {isEditing ? (
          <DynamicList
            list={tempVolunteers || []}
            onAddItem={() => setTempVolunteers((prev) => [...prev, ''])}
            onInputChange={(index, value) =>
              setTempVolunteers((prev) => prev.map((item, i) => (i === index ? value : item)))
            }
            onDeleteItem={(index) => setTempVolunteers((prev) => prev.filter((_, i) => i !== index))}
          />
        ) : (
          <ul>{(event.volunteerList || []).map((vol, i) => <li key={i}>{vol}</li>)}</ul>
        )}
      </div>
  
      <div>
        <h3>Sponsor Categories</h3>
        {isEditing ? (
          <DynamicList
            list={tempSponsors || []}
            onAddItem={() => setTempSponsors((prev) => [...prev, ''])}
            onInputChange={(index, value) =>
              setTempSponsors((prev) => prev.map((item, i) => (i === index ? value : item)))
            }
            onDeleteItem={(index) => setTempSponsors((prev) => prev.filter((_, i) => i !== index))}
          />
        ) : (
          <ul>{(event.sponsorList || []).map((spon, i) => <li key={i}>{spon}</li>)}</ul>
        )}
      </div>
  
      {isEditing ? (
        <div>
          <button id="save" onClick={saveChanges}>
            Save
          </button>
          <button id="cancel" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </div>
      ) : !isPastEvent && (
        <button id="editing" onClick={() => setIsEditing(true)}>
          Edit Event
        </button>
      )}
  
      <div>
        <button className="viewVol" onClick={handleViewVolunteers}>
          View Volunteer List
        </button>
        <button className="viewspon" onClick={handleViewSponsors}>
          View Sponsor List
        </button>
      </div>
    </div>
  );
  
};

export default EventDetails;