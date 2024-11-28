import React, { useState } from "react";
import "./volunteerForm.css";

export const VolunteerForm = ({ showEvent }) => {
  // State to handle form data
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    contact: "",
    photo: "",
    volunteerCategory: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/volunteers/${showEvent.eventTitle}`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Registration Complete");
        console.log("Response:", data);
      } else {
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="volunteerFormMain">
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <input
            type="text"
            id="middleName"
            name="middleName"
            placeholder="Middle Name"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email Id"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <input
            type="tel"
            id="contact"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="formGroup">
          <input
            type="file"
            id="photo"
            name="photo"
            placeholder="Upload your Picture"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <div className="formGroup">
          <select
            id="volunteerCategory"
            name="volunteerCategory"
            value={formData.volunteerCategory}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Volunteer Category</option>
            {showEvent?.volunteerList?.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="formGroup">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;
