import React, { useState } from 'react';

const FilteredTable = ({ data, type, eventStatus, onAccept, onReject }) => {
  const [filter, setFilter] = useState('All');

  if (!data || data.length === 0) {
    return <p>No {type}s available for this event.</p>;
  }

  const uniqueCategories = [...new Set(data.map((item) => item.category))];

  let filteredData = filter === 'All' ? data : data.filter((item) => item.category === filter);

  // Show only accepted volunteers if the event is past
  if (eventStatus === 'past') {
    filteredData = filteredData.filter((item) => item.accepted);
  }

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
            {eventStatus ==='current' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.category}</td>
              <td>
                {eventStatus === 'current' && !item.accepted && !item.rejected && (
                  <>
                    <button onClick={() => onAccept(item.id)}>Accept</button>
                    <button onClick={() => onReject(item.id)}>Reject</button>
                  </>
                )}
                {eventStatus ==='current'&& item.accepted &&  <span>Accepted</span>}
                {eventStatus =='current' && item.rejected && <span>Rejected</span>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;
