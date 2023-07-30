import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Navbar = () => {
  let navigate = useNavigate();

  // Storing the auth-token to localStorage and logging out the user
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand logo" to="/">
            MemoFlow
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {/* Displays login and signup forms when clicked */}
            {!localStorage.getItem("token") ? (
              <div>
                <Link to="/login" className="btn btn-primary mx-1">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary mx-1">
                  Signup
                </Link>
              </div>
              // Displays logout button after user is logged in
            ) : (
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
