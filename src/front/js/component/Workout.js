import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import WorkoutCategories from "../pages/WorkoutCategories";
import FeaturedWorkout from "./FeaturedWorkout";

const Workout = () => {
    const [url, setUrl] = useState("");
    const [workout, setWorkout] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        async function getExercise() {
            if (!url) return;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": process.env.API_KEY,
                    "x-rapidapi-host": "exercisedb.p.rapidapi.com",
                },
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();

                if (Array.isArray(result) && result.length > 0) {
                    setWorkout(result);
                } else {
                    setWorkout([]); // Clear previous workouts if none found
                }

            } catch (error) {
                console.error(error);
                setWorkout([]); // Clear data on error
            }
        }
        getExercise();
    }, [url]);

    const catIndex = (cat) => {
        console.log("Selected category:", cat);
        setUrl(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${cat}`);
        setSelectedCategory(cat);
    };

    const searchExercise = (e) => {
        if (e.key === "Enter") {
            console.log("Searching for:", search);
            setUrl(`https://exercisedb.p.rapidapi.com/exercises/name/${search}?offset=0&limit=10`);
            setSelectedCategory("search");
        }
    };

    return (
        <>
            <div className="main text-center">
                <div data-aos="zoom-out-right" className="workout-heading">
                    <h1 className="header">Workouts:</h1>
                    <h2 className="subheader">Simple Workout, Stunning Results</h2>
                    <div className="search--box">
                        <div className="search input-group mb-3">
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={searchExercise}
                                type="search"
                                className="input"
                                placeholder="Search workouts..."
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="categories text-center d-flex">
                    <WorkoutCategories catIndex={catIndex} />
                </div>
                <div className="recipes_grid mt-5 mx-auto">
                    {selectedCategory === null && <FeaturedWorkout />}
                    {workout.length > 0 ? (
                        <WorkoutCard data={workout} />
                    ) : (
                        selectedCategory && <p>No workouts found for this category.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Workout;
