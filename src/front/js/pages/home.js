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
			<FeaturedRecipes/>
		</div>
	);
};
