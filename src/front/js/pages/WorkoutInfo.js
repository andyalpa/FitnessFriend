import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const WorkoutInfo = () => {
  const { WorkoutID } = useParams();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExercise() {
      try {
        // Fetch all exercises from the GitHub API
        const response = await fetch(
          "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises.json"
        );
        const data = await response.json();

        // Find the specific exercise by ID
        const selectedExercise = data.find((ex) => ex.id === WorkoutID);
        if (selectedExercise) {
          setExercise(selectedExercise);
        } else {
          console.error("Exercise not found");
        }
      } catch (error) {
        console.error("Error fetching exercise:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExercise();
  }, [WorkoutID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!exercise) {
    return <div>Exercise not found.</div>;
  }

  return (
    <div
      data-aos="fade-in"
      className="recipe-box card mb-3 m-5"
      style={{
        minWidth: "540px",
        borderRadius: "1.25rem",
        boxShadow: "0px 0px 30px 7px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ flexDirection: "row-reverse" }}>
        <div className="meal-info_header d-flex">
          {/* Exercise Image */}
          <div data-aos="fade-up-left" style={{ borderRadius: "20px !important" }}>
            <img
              style={{ borderRadius: "1.25rem", width: "300px" }}
              className="img-fluid"
              src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${exercise.images[0]}`}
              alt={exercise.name}
            />
          </div>

          {/* Exercise Details */}
          <div style={{ marginLeft: "3rem" }}>
            <h1 data-aos="fade-down-right" style={{ fontSize: "2rem" }}>
              {exercise.name}
            </h1>
            <h2 data-aos="fade-down-right" style={{ fontSize: "1.5rem" }}>
              Category: {exercise.category}
            </h2>
            <h2 data-aos="fade-down-right" style={{ fontSize: "1.5rem" }}>
              Primary Muscles: {exercise.primaryMuscles.join(", ")}
            </h2>
            <h2 data-aos="fade-down-right" style={{ fontSize: "1.5rem" }}>
              Secondary Muscles:
              <ul>
                {exercise.secondaryMuscles.map((muscle, index) => (
                  <li key={index}>{muscle}</li>
                ))}
              </ul>
            </h2>
          </div>
        </div>

        {/* Exercise Instructions */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="meal-body my-3">
            <div
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
              data-aos="fade-left"
              className="meal-instructions ps-4"
            >
              <h2>Instructions</h2>
              <ul>
                {exercise.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutInfo;