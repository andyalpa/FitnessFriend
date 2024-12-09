import React from "react";
import { LoginModal } from "./loginmodal";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  console.log(store.favs);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <div className="container-fluid ">
        <div>
        <Link to={"/"} className="logo">
            <img src="https://i.imgur.com/y0Ia8hZ.png" alt="Logo Here"/>
        </Link>
        </div>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
    
            <li className="nav-item">
              <Link className="button" to={"/meal"}>Recipes</Link>
            </li>
            <li className="nav-item">
              <a className="button" href="#">Workouts</a>
            </li>

            <LoginModal />


          </ul>
        </div>

        <div className="ml-auto">
                <div className="dropdown">
                    <a className="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Favorites
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
    {store.favs.length > 0 ? (
        store.favs.map((fav, index) => (
            <li key={index} className="d-flex align-items-center">
                <Link className="dropdown-item" to={`/<span class="math-inline">\{fav\.type\}info/</span>{fav.idMeal}`}>
                    {fav.strMeal}
                </Link>
            </li>
        ))
    ) : (
        <li className="dropdown-item text-center">No favorites added</li>
    )}
</ul>
                </div>
            </div>

      </div>
    </nav>
  );
};
