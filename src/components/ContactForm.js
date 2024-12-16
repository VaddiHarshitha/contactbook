import React, { useState, useEffect } from "react";
import API from "../utils/api";
import PropTypes from "prop-types";

const ContactForm = ({ contactId, onFormSubmit }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (contactId) {
      API.get(`contacts/${contactId}/`)
        .then((response) => setFormData(response.data))
        .catch((error) => {
          setError("Failed to load contact data.");
          console.error(error.response || error);
        });
    }
  }, [contactId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiCall = contactId
      ? API.put(`contacts/${contactId}/`, formData) // Update
      : API.post("contacts/", formData); // Create

      apiCall
      .then(() => {
        if (onFormSubmit) onFormSubmit(); // Call the callback if provided
      })
      .catch((error) => {
        // Handle all error cases safely
        const errorMessage =
          error.response?.data?.message || // If the backend provides a `message` field
          JSON.stringify(error.response?.data) || // Fallback to the whole response data
          error.message || // Generic error message from Axios
          "Failed to submit contact."; // Fallback default message
      
        setError(errorMessage); // Display error message
        console.error("Error details:", error.response || error);
      });
  };

  return (
    <div>
      <h2>{contactId ? "Edit Contact" : "Add Contact"}</h2>
      {error && <p style={{ color: "red" }}>{JSON.stringify(error)}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ""}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number || ""}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">
          {contactId ? "Update Contact" : "Add Contact"}
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  contactId: PropTypes.number,
  onFormSubmit: PropTypes.func.isRequired, // Require the prop
};

export default ContactForm;
