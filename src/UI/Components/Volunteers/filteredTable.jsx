import React, { useState } from 'react';
import './filteredTable.css';

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
    <div className="filtered-table-container">
      {/* Filter Section */}
      <div className="filter-bar">
        <button className="filter-button" onClick={() => setFilter('All')}>All</button>
        {uniqueCategories.map((category, index) => (
          <button key={index} className="filter-button" onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <table className="filtered-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Category</th>
            {eventStatus === 'current' && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.firstName}{item.middleName}{item.lastName}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.volunteerCategory || item.sponsorCategory}</td>

              {eventStatus === 'current' &&<td>
                {/* Accept/Reject Buttons */}
                { !item.accepted && !item.rejected && (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => onAccept(item.email)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => onReject(item.email)}
                    >
                      Reject
                    </button>
                  </>
                )}

                {/* Accepted or Rejected Text */}
                { item.accepted && (
                  <span className="accepted-text">Accepted</span>
                )}
                { item.rejected && (
                  <span className="rejected-text">Rejected</span>
                )}
              </td>
}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FilteredTable;