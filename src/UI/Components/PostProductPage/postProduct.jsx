import React, { useState, useEffect } from "react";
import "./postProduct.css";
import { useNavigate } from "react-router-dom";

export const PostProductPage = () => {
//   const [productName, setProductName] = useState("");
//   const [productImage, setProductImage] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [organisationName, setOrganisationName] = useState("");
//   const [splitRatio, setSplitRatio] = useState("");
  const navigate = useNavigate();
  const [organisations, setOrganisations] = useState([]);

  const [formData, setFormData] = useState({
    productName: "",
    productImage: "",
    productDescription: "",
    price: "",
    organisationName: "",
    splitRatio: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchOrganisations = async () => {
      try {
        const response = await fetch("/api/getOrganisations");
        if (!response.ok) {
          throw new Error("Failed to fetch organisations");
        }
        const organisationsData = await response.json();
        setOrganisations(organisationsData);
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    fetchOrganisations();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/postProduct`, { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Product Posted");
        console.log("Response:", data);
      } else {
        console.log(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div id="postProductPage">
      <h1>Post a Product for Sale</h1>
      <form onSubmit={handleSubmit} className="post-product-form">
        <div className="form-group">
          <input
            type="text"
            id="productName"
            placeholder="Product Name"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="url"
            id="productImage"
            name="productImage"
            placeholder="Product Image"
            value={formData.productImage}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <textarea
            id="productDescription"
            placeholder="Description"
            name="productDescription"
            value={formData.productDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            id="price"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <select
            id="organisationName"
            value={formData.organisationName}
            onChange={handleInputChange}
            name="organisationName"
            required
          >
            <option value="" disabled>Select an organisation to Donate</option>
            {organisations.map((org) => (
              <option key={org.id} value={org.organisationName}>
                {org.organisationName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group"> 
          <input
            type="text"
            id="splitRatio"
            name="splitRatio"
            placeholder="Split Percent"
            value={formData.splitRatio}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Post Product
        </button>
      </form>
    </div>
  );
};

export default PostProductPage;
