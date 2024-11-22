import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilteredTable from './FilteredTable';

const VolunteerListPage = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Replace with API call to fetch volunteers for the specific eventId
    const dummyVolunteers = [
      { id: 1, name: 'John Doe', contact: '1234567890', email: 'john@example.com', category: 'Environmentalists' },
      { id: 2, name: 'Jane Smith', contact: '0987654321', email: 'jane@example.com', category: 'Local Students' },
    ];
    setVolunteers(dummyVolunteers); // Filter volunteers by eventId if needed
  }, [eventId]);

  return (
    <div>
      <h1>Volunteers for Event {eventId}</h1>
      <FilteredTable data={volunteers} type="volunteer" />
    </div>
  );
};

export default VolunteerListPage;
