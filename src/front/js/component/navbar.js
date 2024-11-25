import React from "react";
import { Link } from "react-router-dom";
import { LoginModal } from "./loginmodal";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div>Logo Goes Here</div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active button" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="button" href="#">Recipes</a>
            </li>
            <li className="nav-item">
              <a className="button" href="#">Workouts</a>
            </li>

            <LoginModal />


          </ul>
        </div>
      </div>
    </nav>
  );
};
