import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carouselhome"
import "../../styles/home.css";
import { Link } from "react-router-dom";
import FeaturedRecipes from "../component/FeaturedRecipes";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<div>
			<Carousel />
			<Link to={"/signup"} className="btn btn-primary mx-2" >Sign Up</Link>
			<Link to={"/login"} className="btn btn-primary mx-2" >log In</Link>
			<Link to={"/profile"} className="btn btn-primary mx-2" >Profile</Link>
			<FeaturedRecipes/>
		</div>
	);
};
