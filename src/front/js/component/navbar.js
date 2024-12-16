import React, { useContext } from "react";
import { LoginModal } from "./loginmodal";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      
      <div className="container-fluid d-flex justify-content-between">
     

        <Link to={"/"} className="logo">
          <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here" />
        </Link>


				<h1 className="homeHeader">Meet Your Newest Friend in Fitness
					</h1>
			
        <div className="nav nav-tabs">
          <ul className="nav nav-tabs">
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
    </nav>
  );
};
