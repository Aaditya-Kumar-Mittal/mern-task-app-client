import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importing ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify

function Header({ searchText, setSearchText }) {
  const navigation = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetching user data from localStorage on component mount
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Displaying success toast message on logout
    toast.success("Logged Out Successfully!");
    // Clearing user data from localStorage
    localStorage.clear();
    setTimeout(() => {
      // Redirecting to login page after logout
      navigation("/login");
    }, 2000);
  };

  return (
    <nav
      className="navbar navbar-expand-lg text-center"
      data-bs-theme="dark"
      style={{
        backgroundColor: "rgb(129, 0, 52)",
        color: "rgb(255, 246, 0)",
      }}
    >
      <ToastContainer />
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{
            color: "rgb(255, 246, 0)",
          }}
        >
          Todo Task Manager
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className="nav-link active"
                to="/"
                style={{
                  color: "rgb(255, 246, 0)",
                  cursor: "pointer",
                }}
              >
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>

            {/* Conditionally rendering login/logout links */}
            {user ? (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  onClick={handleLogout}
                  style={{
                    color: "rgb(255, 246, 0)",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={{
                      color: "rgb(255, 246, 0)",
                      cursor: "pointer",
                    }}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={{
                      color: "rgb(255, 246, 0)",
                      cursor: "pointer",
                    }}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Conditionally rendering search bar if user is logged in */}
          {user && (
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search 🔍"
                style={{
                  borderRadius: "35px",
                  color: "rgb(129, 0, 52)",
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                className="btn btn-secondary my-2 my-sm-0"
                type="submit"
                style={{
                  backgroundColor: " rgb(255, 246, 0)",
                  color: "rgb(129, 0, 52)",
                }}
              >
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
