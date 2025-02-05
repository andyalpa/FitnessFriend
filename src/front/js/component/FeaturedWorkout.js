import React from "react";
import WorkoutCard from "./WorkoutCard";

const FeaturedWorkout = ({ exercises }) => {


  
    return (
        <>
            {exercises.map((exercise) => (
                <WorkoutCard key={exercise.id} data={exercise} />
            ))}
        </>
    );
};

export default FeaturedWorkout;