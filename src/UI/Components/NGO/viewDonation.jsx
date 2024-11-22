import React, { useState, useEffect } from 'react';

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
    <div className="table-container">
      <h1>Transaction Table</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={isFiltered}
          />
        </label>
        <label style={{ marginLeft: '10px' }}>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            disabled={isFiltered}
          />
        </label>
        <button onClick={handleFilter} style={{ marginLeft: '10px' }}>
          {isFiltered ? "Remove Filter" : "Filter"}
        </button>
      </div>

      <table border="1">
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

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        Total Amount: ${totalAmount.toFixed(2)}
      </div>
    </div>
  );
};

export default DonationTable;
