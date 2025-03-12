import React, { useContext, useState } from "react";
import { LoginModal } from "./loginmodal";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import { LogoutButton } from "../pages/logoutButton";
import { useTheme } from "../context/ThemeContext";
import fitnessFriend from "/public/fitnessFriend.png";

export const Navbar = () => {
  const { store } = useContext(Context);
  const { darkMode, toggleTheme } = useTheme();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={fitnessFriend} alt="Fitness Friend Logo" />
          </Link>
          <h1 className="navbar-title">Meet Your Newest Friend in Fitness</h1>
        </div>

        <div className="navbar-right">
          <Link
            to="/meal"
            className={`nav-link ${isActive("/meal") ? "active" : ""}`}
          >
            Recipes
          </Link>
          <Link
            to="/workout"
            className={`nav-link ${isActive("/workout") ? "active" : ""}`}
          >
            Workout
          </Link>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {store.user ? (
            <>
              <Link
                to="/profile"
                className={`nav-link ${isActive("/profile") ? "active" : ""}`}
              >
                Profile
              </Link>
              <div className="nav-link">
                <LogoutButton />
              </div>
            </>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowLoginModal(true)}
            >
              Login
            </button>
          )}
        </div>
      </div>

      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />

      <style jsx>{`
        .modern-navbar {
          padding: 1rem 2rem;
          background: var(--background-color);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .navbar-logo img {
          height: 40px;
          width: auto;
          transition: transform 0.2s;
        }

        .navbar-logo:hover img {
          transform: scale(1.05);
        }

        .navbar-title {
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--text-color);
          margin: 0;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .nav-link {
          color: var(--text-color);
          text-decoration: none;
          font-weight: 500;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .nav-link:hover {
          background: var(--hover-color);
        }

        .nav-link.active {
          color: var(--primary-color);
          background: var(--active-color);
        }

        .theme-toggle {
          background: none;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover {
          background: var(--hover-color);
        }

        .login-button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .login-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        @media (max-width: 768px) {
          .navbar-title {
            display: none;
          }

          .navbar-container {
            flex-direction: column;
            gap: 1rem;
          }

          .navbar-right {
            width: 100%;
            justify-content: space-around;
          }
        }
      `}</style>
    </nav>
  );
};
