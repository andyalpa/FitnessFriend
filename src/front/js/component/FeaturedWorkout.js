import React, { useState, useEffect } from "react";
import WorkoutCard from "./WorkoutCard.js";

const FeaturedWorkout = () => {
  const [randomWorkout, setRandomWorkout] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted

    async function getInfo() {
      const url = "https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0";
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_KEY, // Ensure API_KEY is defined in your .env
          "x-rapidapi-host": "exercisedb.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log("Fetched Workouts:", result);

        if (isMounted) {
          setRandomWorkout(result); // Update state only if mounted
          setShow(true);
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch workouts:", error);
          setShow(false);
        }
      }
    }

    getInfo();

    return () => {
      isMounted = false; // Cleanup on component unmount
    };
  }, []);

  return (
    <>
      {show ? (
        randomWorkout?.map((workout) => (
          <WorkoutCard key={workout.id} data={workout} /> // Ensure `workout.id` is unique
        ))
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default FeaturedWorkout;
