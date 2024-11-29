import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FilteredTable from '../Volunteers/filteredTable';
import '../Volunteers/filteredTable.css';

const SponsorListPage = ({event}) => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [sponsors, setSponsors] = useState([]);
  const [eventStatus, setEventStatus] = useState('current'); // Can be 'current' or 'past'

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        // Fetch volunteers based on the event title
        const response = await fetch(`/api/sponsors/${event.eventTitle}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Check if data exists and volunteers are present
        const sponsorList = data.sponsors?.[0]?.sponsorList || [];
        setSponsors(sponsorList);

        // Set event status based on event date
        const currentDate = new Date();
        const eventDate = new Date(data.volunteers?.[0]?.eventDate || currentDate); // Default to current date if no eventDate is provided
        setEventStatus(eventDate >= currentDate ? 'current' : 'past');
      } catch (err) {
        console.error('Error fetching volunteers:', err);
        // You can set error states or display error messages as needed
      }
    };

    fetchSponsors();
  }, [event.eventTitle]);

  const handleAccept = (id) => {
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.email === id ? { ...sponsor, accepted: true, rejected: false } : sponsor
      )
    );
  };

  const handleReject = (id) => {
    setSponsors((prev) =>
      prev.map((sponsor) =>
        sponsor.email === id ? { ...sponsor, rejected: true, accepted: false } : sponsor
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