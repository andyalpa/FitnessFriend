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
    return <div className="loading">Loading...</div>;
  }

  if (!exercise) {
    return <div className="not-found">Exercise not found.</div>;
  }

  return (
    <div
      data-aos="fade-in"
      className="recipe-box card mb-3 m-5"
      style={{
        minWidth: "540px",
        borderRadius: "1.25rem",
      }}
    >
      <div style={{ flexDirection: "row-reverse" }}>
        <div className="meal-info_header d-flex">
          {/* Exercise Image */}
          <div data-aos="fade-up-left" style={{ borderRadius: "20px !important" }}>
            <img
              style={{ borderRadius: "1.25rem", width: "300px" }}
              className="img-fluid"
              src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/dist/exercises/${exercise.images[0]}`}
              alt={exercise.name}
            />
          </div>

          {/* Exercise Details */}
          <div style={{ marginLeft: "3rem" }}>
            <h1 data-aos="fade-down-right" className="exercise-title">
              {exercise.name}
            </h1>
            <h2 data-aos="fade-down-right" className="exercise-category">
              Category: {exercise.category}
            </h2>
            <h2 data-aos="fade-down-right" className="exercise-muscles">
              Primary Muscles: {exercise.primaryMuscles.join(", ")}
            </h2>
            <h2 data-aos="fade-down-right" className="exercise-muscles">
              Secondary Muscles:
              <ul className="muscles-list">
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
              className="meal-instructions ps-4"
              style={{
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
              }}
              data-aos="fade-left"
            >
              <h2>Instructions</h2>
              <ul className="instructions-list">
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