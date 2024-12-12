import React, { useContext } from "react";
import { LoginModal } from "./loginmodal";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
          <div className="nav nav-tabs float-right border-0">
          <div className="nav-item"> 
            <ul class="nav nav-tabs">

            <Link to={"/"} className="logo nav-link">
              <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here" />
            </Link>
            <li className="nav-item nav-link">
              <Link to={"/meal"}>Recipes</Link>
            </li>
            <li className="nav-item nav-link">
            <Link to={"/workout"}>Workout</Link>
            </li>
            <li className="nav-item nav-link">
              <Link to={"/profile"}>Profile</Link>
            </li>
            {store.user ? (
              <li className="nav-item nav-link">
                <a href="#">Logout</a>
              </li>
            ) : (
              <li className="nav-item nav-link">
                <LoginModal />
              </li>
            )} 
            </ul>
          </div>
       </div>
      </div>
    </nav>
  );
};