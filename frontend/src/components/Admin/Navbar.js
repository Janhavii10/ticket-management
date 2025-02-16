import React, { useEffect, useState } from "react";
import "../../styles/navbar.css"; // Import your custom CSS
import axios from "axios";

const Navbar = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you store the JWT in localStorage
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        });

        // Set the user's name
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user profile:", error.response?.data || error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://media.licdn.com/dms/image/v2/D4E0BAQHS2G46ujkRug/company-logo_200_200/company-logo_200_200/0/1720723871576?e=2147483647&v=beta&t=Capag2dok1g8slpwxM2N_1a5oWwQE4n8zS33UQd2dZE"
            alt="Logo"
            className="logo me-2"
          />
        </a>

        {/* Toggler for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/dashboard-admin">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard-admin/all-tickets">
                Tickets
              </a>
            </li>
          </ul>

          {/* Right Section */}
          <ul className="navbar-nav ms-auto d-flex align-items-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="bi bi-bell-fill"></i>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {userName || "Admin"}!{" "}
                <i className="bi bi-person-circle ms-2"></i>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/change-password">
                    Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/login">
                    Log Out
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
