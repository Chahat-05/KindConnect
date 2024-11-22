import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DynamicList from './dynamicList';  // Import your pre-existing DynamicList component
import { useNavigate } from 'react-router-dom';
import "./eventDetails.css"

const EventDetails = () => {
  const navigate=useNavigate()
  const { eventId } = useParams();

  const dummyEvents = [
    { 
      id: 1, 
      title: 'Beach Cleanup', 
      image: '/assets/junior-friends.jpg', 
      description: 'Join us for a beach cleanup...', 
      date: '2024-11-20',
      volunteers: ['Environmentalists', 'Local Students'],
      sponsors: ['Green Initiatives', 'OceanCare']
    },
    { 
      id: 2, 
      title: 'Food Drive', 
      image: '/images/food-drive.jpg', 
      description: 'We are organizing a food drive...', 
      date: '2024-10-10',
      volunteers: ['Community Volunteers'],
      sponsors: ['Food Corp', 'Generous Hearts']
    },
    { 
        id: 3, 
        title: 'Fundraiser Gala', 
        image: '/images/fundraiser.jpg', 
        description: 'Support us in raising funds...',
        date: '2024-11-25',
        volunteers: ['Fundraisers', 'Event Planners'],
        sponsors: ['Charity Foundation', 'Bank XYZ']
    }
  ];

  const event = dummyEvents.find(e => e.id === parseInt(eventId));

 
  // Convert the event date to a Date object for comparison
  const eventDate = new Date(event.date);
  const currentDate = new Date();

  const isPastEvent = eventDate < currentDate;  // Check if the event is in the past

  const [eventData, setEventData] = useState(event);
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(event.description);
  const [tempDate, setTempDate] = useState(event.date);
  const [tempVolunteers, setTempVolunteers] = useState(event.volunteers);
  const [tempSponsors, setTempSponsors] = useState(event.sponsors);

  useEffect(() => {
    const newEvent = dummyEvents.find(e => e.id === parseInt(eventId));
    if (newEvent) {
      setEventData(newEvent);
      setTempDescription(newEvent.description);
      setTempDate(newEvent.date);
      setTempVolunteers(newEvent.volunteers);
      setTempSponsors(newEvent.sponsors);
    }
  }, [eventId]);
  if (!event) {
    return <div>Event not found</div>;
  }

  const saveChanges = () => {
    setEventData({
      ...eventData,
      description: tempDescription,
      date: tempDate,
      volunteers: tempVolunteers,
      sponsors: tempSponsors,
    });
    setIsEditing(false);
  };

  const handleViewVolunteers = () => {
    navigate(`/event/${eventId}/volunteers`);
  };

  const handleViewSponsors = () => {
    navigate(`/event/${eventId}/sponsors`);
  };

  return (
    <div className="event-details-page">
      <h2>{eventData.title}</h2>
      <img  className="eventImage" src={eventData.image} alt={eventData.title} />

      <div>
        <h3>Description</h3>
        <p>{isEditing ? 
          <textarea value={tempDescription} onChange={(e) => setTempDescription(e.target.value)} /> 
          : eventData.description}
        </p>
      </div>

      <div>
        <h3>Date</h3>
        <p>{isEditing ? 
          <input type="date" value={tempDate} onChange={(e) => setTempDate(e.target.value)} /> 
          : eventData.date}
        </p>
      </div>

      <div>
        <h3>Volunteer Categories</h3>
        {isEditing ? (
          <DynamicList
            list={tempVolunteers}
            onAddItem={() => setTempVolunteers((prev) => [...prev, ''])}  // Add new empty item
            onInputChange={(index, value) => setTempVolunteers((prev) => prev.map((item, i) => i === index ? value : item))}  // Handle input change
            onDeleteItem={(index) => setTempVolunteers((prev) => prev.filter((_, i) => i !== index))}  // Remove item
          />
        ) : (
          <ul>{eventData.volunteers.map((vol, i) => <li key={i}>{vol}</li>)}</ul>
        )}
      </div>

      <div>
        <h3>Sponsor Categories</h3>
        {isEditing ? (
          <DynamicList
            list={tempSponsors}
            onAddItem={() => setTempSponsors((prev) => [...prev, ''])}  // Add new empty item
            onInputChange={(index, value) => setTempSponsors((prev) => prev.map((item, i) => i === index ? value : item))}  // Handle input change
            onDeleteItem={(index) => setTempSponsors((prev) => prev.filter((_, i) => i !== index))}  // Remove item
          />
        ) : (
          <ul>{eventData.sponsors.map((spon, i) => <li key={i}>{spon}</li>)}</ul>
        )}
      </div>

      {isEditing ? (
        <div>
          <button onClick={saveChanges}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : !isPastEvent && (
        <button id="editimg" onClick={() => setIsEditing(true)}>Edit Event</button>
      )}


<div>
        <button onClick={handleViewVolunteers}>View Volunteer List</button>
        <button onClick={handleViewSponsors}>View Sponsor List</button>
      </div>
    </div>
  );
};

export default EventDetails;
