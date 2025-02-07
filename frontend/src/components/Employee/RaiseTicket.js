import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/raiseticket.css";  // Import the CSS file

const RaiseTicket = () => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "",
    priority: "",
    attachments: null,
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser && loggedInUser.id) {
      setUserId(loggedInUser.id);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, attachments: e.target.files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token not found. Please log in.");
      return;
    }
  
    if (!formData.category) {
      alert("Please select a valid category.");
      return;
    }
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("subject", formData.subject);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("priority", formData.priority);
      formDataToSend.append("user_id", userId); // Ensure user_id is included
  
      if (formData.attachments) {
        Array.from(formData.attachments).forEach((file) => {
          formDataToSend.append("attachments", file);
        });
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/tickets",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      alert(response.data.message);
      setFormData({
        subject: "",
        description: "",
        category: "",
        priority: "",
        attachments: null,
      });
    } catch (err) {
      console.error("Server Error:", err.response?.data || err.message);
      alert("Error creating ticket: " + (err.response?.data?.message || "Unknown error"));
    }
  };
  

  return (
    <div className="main">
      <div className="card p-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">
              Category <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option> {/* Ensure users cannot submit an empty category */}
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="priority" className="form-label fw-bold">
              Priority <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="subject" className="form-label fw-bold">
              Subject <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-bold">
              Describe your issue
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              placeholder="Enter detailed description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="attachments" className="form-label fw-bold">
              Upload Attachment
            </label>
            <input
              type="file"
              className="form-control"
              id="attachments"
              multiple
              onChange={handleFileChange}
            />
            {/* <small className="text-muted">Valid filetypes: DOC, PDF, PNG, JPG, JPEG</small> */}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RaiseTicket;
