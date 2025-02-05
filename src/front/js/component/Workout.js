import React, { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";
import WorkoutCategories from "../pages/WorkoutCategories";
import FeaturedWorkout from "./FeaturedWorkout";

const Workout = () => {
    const [allExercises, setAllExercises] = useState([]);
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchAllExercises() {
            try {
                const response = await fetch(
                    "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
                );
                const data = await response.json();
                setAllExercises(data);
                
                // Extract unique categories from primaryMuscles
                const muscles = [...new Set(data.flatMap(ex => ex.primaryMuscles))];
                setCategories(muscles);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        }
        fetchAllExercises();
    }, []);

    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        const filtered = allExercises.filter(exercise => 
            exercise.primaryMuscles.includes(category)
        );
        setFilteredExercises(filtered);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            const results = allExercises.filter(exercise =>
                exercise.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredExercises(results);
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
                                onKeyDown={handleSearch}
                                type="search"
                                className="input"
                                placeholder="Search workouts..."
                            />
                        </div>
                        <i className="fas fa-search"></i>
                    </div>
                </div>
                <div className="categories text-center d-flex">
                    <WorkoutCategories 
                        categories={categories} 
                        onSelectCategory={handleCategoryFilter} 
                    />
                </div>
                <div className="recipes_grid mt-5 mx-auto">
                    {!selectedCategory ? (
                        <FeaturedWorkout exercises={allExercises.slice(0, 10)} />
                    ) : filteredExercises.length > 0 ? (
                        filteredExercises.map((exercise) => (
                            <WorkoutCard key={exercise.id} data={exercise} />
                        ))
                    ) : (
                        <p>No workouts found for this category.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Workout;