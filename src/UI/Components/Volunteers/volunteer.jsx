import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilteredTable from './filteredTable';
import './filteredTable.css';

const VolunteerListPage = ({ event }) => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [volunteers, setVolunteers] = useState([]);
  const [eventStatus, setEventStatus] = useState('current'); // Can be 'current' or 'past'

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        // Fetch volunteers based on the event title
        const response = await fetch(`/api/volunteers/${event.eventTitle}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Check if data exists and volunteers are present
        const volunteerList = data.volunteers?.[0]?.volunteerList || [];
        setVolunteers(volunteerList);

        // Set event status based on event date
        const currentDate = new Date();
        const eventDate = new Date(data.volunteers?.[0]?.eventDate || currentDate); // Default to current date if no eventDate is provided
        setEventStatus(eventDate >= currentDate ? 'current' : 'past');
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        // You can set error states or display error messages as needed
      }
    };

    fetchVolunteers();
  }, [event.eventTitle]);

  const handleAccept = (email) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.email === email ? { ...volunteer, accepted: true, rejected: false } : volunteer
      )
    );
  };

  const handleReject = (email) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.email === email ? { ...volunteer, rejected: true, accepted: false } : volunteer
      )
    );
  };

  return (
    <div className="table-container">
      <h1 className="mylist">Volunteers for Event {event.eventTitle || eventId}</h1>
      <FilteredTable
        data={volunteers}
        type="volunteer"
        eventStatus={eventStatus}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default VolunteerListPage;
