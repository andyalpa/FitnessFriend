import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carouselhome"
import "../../styles/home.css";
import { Link } from "react-router-dom";
import FeaturedRecipes from "../component/FeaturedRecipes";
import FeaturedWorkout from "../component/FeaturedWorkout";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [exercises, setExercises] = useState([]);

	useEffect(() => {
		async function fetchExercises() {
			try {
				const response = await fetch(
					"https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
				);
				const data = await response.json();
				setExercises(data);
			} catch (error) {
				console.error("Error fetching exercises:", error);
			}
		}
		fetchExercises();
	}, []);

	return (

		<div className="mx-auto">
			<Carousel className="overlay" />
			<div data-aos="fade-in">
				<h2 data-aos="fade-in" className="home-header">Featured Recipes </h2>
				<div className="recipes_grid mt-5 mx-auto">
					<FeaturedRecipes />
				</div>
			</div>
			<div data-aos="fade-out">
				<h2 data-aos="fade-in" className="home-header">Featured Workouts </h2>
				<div className="recipes_grid mt-5 mx-auto">
					<FeaturedWorkout exercises={exercises.slice(0, 10)} />
				</div>
			</div>
		</div>
	);
};
