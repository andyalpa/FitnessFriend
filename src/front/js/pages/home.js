import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carouselhome";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import FeaturedRecipes from "../component/FeaturedRecipes";
import FeaturedWorkout from "../component/FeaturedWorkout";
import { FaUtensils, FaDumbbell } from "react-icons/fa";

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
        <div className="container py-5">
            <Carousel className="overlay" />
            <div data-aos="fade-in">
                <h2 data-aos="fade-in" className="home-header">
                    <FaUtensils className="me-2" /> Featured Recipes
                </h2>
                <div className="recipes_grid mt-5 mx-auto">
                    <FeaturedRecipes />
                </div>
                <div className="text-center mt-4">
                    <Link to="/recipes" className="btn btn-primary">
                        View All Recipes
                    </Link>
                </div>
            </div>
            <div data-aos="fade-in">
                <h2 data-aos="fade-in" className="home-header">
                    <FaDumbbell className="me-2" /> Featured Workouts
                </h2>
                <div className="recipes_grid mt-5 mx-auto">
                    <FeaturedWorkout exercises={exercises.slice(0, 10)} />
                </div>
                <div className="text-center mt-4">
                    <Link to="/workouts" className="btn btn-primary">
                        View All Workouts
                    </Link>
                </div>
            </div>
        </div>
    );
};