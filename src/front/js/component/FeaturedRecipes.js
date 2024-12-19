import React, { useState, useEffect } from "react";
import MealCard from "./MealCard.js";

const FeaturedRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag to track if the component is mounted

    async function getInfo() {
      const recipes = [];
      try {
        for (let i = 0; i < 8; i++) {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/random.php`
          );
          const data = await res.json();
          recipes.push(data.meals);
        }
        if (isMounted) {
          setRandomRecipes(recipes); // Only update state if the component is mounted
          setShow(true);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    }

    getInfo();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates
    };
  }, []);

  return (
    <>
      {show
        ? randomRecipes.map((recipe, index) => (
          <MealCard
            key={recipe[0]?.idMeal || index} // Use a unique identifier if possible
            data={recipe}
          />
        ))
        : "Loading..."}
    </>
  );
};

export default FeaturedRecipes;
