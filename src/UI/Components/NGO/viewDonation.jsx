import React, { useState, useEffect } from 'react';
import './viewDonation.css'
const DonationTable = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isFiltered, setIsFiltered] = useState(false);

  // Dummy data for transactions
  useEffect(() => {
    const dummyData = [
      { "username": "johndoe", "amount": 150.75, "category": "Donation", "date": "2024-11-07" },
      { "username": "janedoe", "amount": 200.00, "category": "Sponsorship", "date": "2024-11-05" },
      { "username": "alexsmith", "amount": 50.25, "category": "Event Entry", "date": "2024-11-06" }
    ];
    setData(dummyData);
    setFilteredData(dummyData);

    // Calculate initial total amount of all transactions
    const initialTotal = dummyData.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(initialTotal);
  }, []);

  // Function to filter data based on date range and calculate total
  const handleFilter = () => {
    if (isFiltered) {
      // Reset filter
      setFilteredData(data);
      setStartDate('');
      setEndDate('');
      const initialTotal = data.reduce((sum, item) => sum + item.amount, 0);
      setTotalAmount(initialTotal);
      setIsFiltered(false);
    } else {
      // Apply filter
      const filtered = data.filter(item => {
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return itemDate >= start && itemDate <= end;
      });
      setFilteredData(filtered);

      // Calculate the total amount for the filtered data
      const filteredTotal = filtered.reduce((sum, item) => sum + item.amount, 0);
      setTotalAmount(filteredTotal);
      setIsFiltered(true);
    }
  };

  return (
    <div className="donation-table-container">
      <h1 className="donation-table-title">Transaction Table</h1>
      
      <div className="donation-table-filter">
        <label className= "donation-table-label">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isFiltered}
            className="donation-table-input"
          />
        </label>
        <label className="donation-table-label">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isFiltered}
            className="donation-table-input"
          />
        </label>
        <button onClick={handleFilter} className="donation-table-button">
          {isFiltered ? "Remove Filter" : "Filter"}
        </button>
      </div>

      <table className="donation-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.amount.toFixed(2)}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="donation-table-total">
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default DonationTable;
