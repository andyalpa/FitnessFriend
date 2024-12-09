import React, { useContext } from "react";
import { LoginModal } from "./loginmodal";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div>
          <Link to={"/"} className="logo">
            <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here" />
          </Link>
        </div>

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

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/Meal"} className="button">
                Recipes
              </Link>
            </li>
            <li className="nav-item">
              <a className="button" href="#">
                Workouts
              </a>
            </li>
            <li className="nav-item">
              <Link to={"/profile"} className="button" href="#">
                Profile
              </Link>
            </li>
            {store.user ? (
              <span
                className="nav-item"
                to="/"
                onClick={() => {
                  actions.logout();
                }}
              >
                Logout
              </span>
            ) : (
              <LoginModal />
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
