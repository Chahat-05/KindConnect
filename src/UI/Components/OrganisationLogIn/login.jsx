import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NGOLoginPage = ({setOrganisationUser}) => {
  const [ngoID, setNgoID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/orglogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          organisationEmail: ngoID,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Successful login
        alert(`Welcome, ${data.organisationUser}!`);
        setOrganisationUser(data.organisationUser); // Set user in parent component
        navigate('/donation');
      } else {
        // Handle errors
        alert(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>NGO Login</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.inputGroup}>
          <label htmlFor="ngoID" style={styles.label}>
            NGO ID:
          </label>
          <input
            type="text"
            id="ngoID"
            placeholder="Enter NGO ID"
            value={ngoID}
            onChange={(e) => setNgoID(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    color: "#555",
    textAlign: "left",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
  forgotPassword: {
    marginTop: "10px",
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default NGOLoginPage;