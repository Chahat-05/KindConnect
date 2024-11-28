import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilteredTable from './FilteredTable';
import './filteredTable.css';

const VolunteerListPage = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [volunteers, setVolunteers] = useState([]);
  const [eventStatus, setEventStatus] = useState('current'); // Can be 'current' or 'past'

  useEffect(() => {
    // Replace this with an actual API call to fetch event details, including its date
    const eventDetail = { eventDate: '2024-11-01' }; // Example: Replace with fetched data
    const currentDate = new Date();
    const eventDate = new Date(eventDetail.eventDate);

    // Determine if the event is current or past based on the date
    setEventStatus(eventDate >= currentDate ? 'current' : 'past');

    // Replace with API call to fetch volunteers for the specific eventId
    const dummyVolunteers = [
      { id: 1, name: 'John Doe', contact: '1234567890', email: 'john@example.com', category: 'Environmentalists', accepted: true, rejected: false },
      { id: 1, name: 'Jane Smith', contact: '0987654321', email: 'jane@example.com', category: 'Local Students', accepted: true, rejected: false },
      { id: 1, name: 'Bob Brown', contact: '1122334455', email: 'bob@example.com', category: 'Local Students', accepted: false, rejected: false },
    ];

    setVolunteers(dummyVolunteers);
  }, [eventId]);

  const handleAccept = (id) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.id === id ? { ...volunteer, accepted: true, rejected: false } : volunteer
      )
    );
  };

  const handleReject = (id) => {
    setVolunteers((prev) =>
      prev.map((volunteer) =>
        volunteer.id === id ? { ...volunteer, rejected: true, accepted: false } : volunteer
      )
    );
  };

  return (
    <div className='table-container'>
      <h1 className='mylist'>Volunteers for Event {eventId}</h1>
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
