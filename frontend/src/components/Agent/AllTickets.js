import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tickets data from the backend
    const fetchTickets = async () => {
      const token = localStorage.getItem('token'); // Get the token from localStorage

      if (!token) {
        setError('Unauthorized: Please log in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/showtickets', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        setTickets(response.data.tickets);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching tickets');
      }
    };

    fetchTickets();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h4>All Tickets ({tickets.length})</h4>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div
            className="card mb-3"
            key={ticket.ticket_id}
            style={{ border: "1px solid #ddd", borderRadius: "8px" }}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <p className="mb-1">
                    <strong>Ticket ID:</strong> {ticket.ticket_id}
                  </p>
                  <p className="mb-1">
                    <strong>Created On:</strong> {new Date(ticket.created_at).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Subject:</strong> {ticket.subject}
                    <a
                      href="#"
                      style={{
                        textDecoration: "none",
                        color: "#4a4cb5",
                        fontWeight: "bold",
                      }}
                    >
                      {ticket.title}
                    </a>
                  </p>
                  <p className="mb-0">
                    <strong>Priority:</strong> {ticket.priority} -{" "}
                    <span>{ticket.status}</span>
                  </p>
                </div>
                <div className="text-end">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: ticket.status === "Closed" ? "#d4f8e8" : "#f9e8d4",
                      color: ticket.status === "Closed" ? "#28a745" : "#e67e22",
                      padding: "6px 12px",
                      borderRadius: "12px",
                    }}
                  >
                    {ticket.status}
                  </span>
                  <br />
                  <a
                    href="#"
                    style={{
                      color: "#4a4cb5",
                      textDecoration: "none",
                      marginTop: "8px",
                      display: "inline-block",
                    }}
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTickets;
