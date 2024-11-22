import React, { useState, useEffect } from 'react';
import './filteredTable.css'
const FilteredTable = ({ data, type }) => {
  const [filter, setFilter] = useState('All');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Update the current date every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // Ensure data is not undefined or empty
  if (!data || data.length === 0) {
    return <p>No {type}s available for this event.</p>;
  }

  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  const filteredData = filter === 'All' ? data : data.filter((item) => item.category === filter);

  const calculateTimeLeft = (timestamp) => {
    const timeLeft = new Date(timestamp) - currentDate;
    const hoursLeft = Math.floor(timeLeft / 1000 / 60 / 60);
    const minutesLeft = Math.floor((timeLeft / 1000 / 60) % 60);

    if (timeLeft <= 0) return 'Time Expired';
    return `${hoursLeft}h ${minutesLeft}m left`;
  };

  return (
    <div>
      <div className="filter-bar">
        <button onClick={() => setFilter('All')}>All</button>
        {uniqueCategories.map((category, index) => (
          <button key={index} onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </div>

      <table className="filtered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Category</th>
            <th>Status</th>
            <th>Time Left</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.category}</td>
              <td>{item.accepted ? 'Accepted' : 'Pending'}</td>
              <td>{calculateTimeLeft(item.timestamp)}</td>
              <td>
                {!item.accepted && (
                  <>
                    <button
                      onClick={() => {
                        alert(`${type} Accepted: ${item.name}`);
                        // Logic to update item status to accepted in your state or database
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        alert(`${type} Rejected: ${item.name}`);
                        // Logic to update item status to rejected in your state or database
                      }}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;
