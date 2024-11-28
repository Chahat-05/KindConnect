import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilteredTable from './FilteredTable';
import './filteredTable.css';

const SponsorListPage = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [sponsors, setSponsors] = useState([]);
  const [eventStatus, setEventStatus] = useState('current'); // Can be 'current' or 'past'

  useEffect(() => {
    // Replace this with an actual API call to fetch event details, including its date
    const eventDetail = { eventDate: '2024-12-01' }; // Example: Replace with fetched data
    const currentDate = new Date();
    const eventDate = new Date(eventDetail.eventDate);

    // Determine if the event is current or past based on the date
    setEventStatus(eventDate >= currentDate ? 'current' : 'past');

    // Replace with API call to fetch volunteers for the specific eventId
    const dummySponsors = [
      { id: 1, name: 'John Doe', contact: '1234567890', email: 'john@example.com', category: 'Environmentalists', accepted: false, rejected: false },
      { id: 2, name: 'Jane Smith', contact: '0987654321', email: 'jane@example.com', category: 'Local Students', accepted: true, rejected: false },
      { id: 3, name: 'Bob Brown', contact: '1122334455', email: 'bob@example.com', category: 'Local Students', accepted: false, rejected: false },
    ];

    setSponsors(dummySponsors);
  }, [eventId]);

  const handleAccept = (id) => {
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, accepted: true, rejected: false } : sponsor
      )
    );
  };

  const handleReject = (id) => {
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.id === id ? { ...sponsor, rejected: true, accepted: false } : sponsor
      )
    );
  };

  return (
    <div className='table-container'>
      <h1 className='mylist'>Sponsors for Event {eventId}</h1>
      <FilteredTable
        data={sponsors}
        type="sponsor"
        eventStatus={eventStatus}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </div>
  );
};

export default SponsorListPage;
