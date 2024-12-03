import React, { useState, useEffect } from "react";
import MealCard from "./MealCard.js";


const CategoryRecipes = ({cat}) => {
  const [categoryRecipes, setCategoryRecipes] = useState()
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState("");

  useEffect(() => {
    async function getRecipe() {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        let data = await res.json();
        console.log(data);
        setCategoryRecipes(data.meals);
        setShow(true)


    }
    getRecipe();
}, [cat])


  return (
    <>
      
        {
          show ? categoryRecipes?.map((recipe, index) => (
            <MealCard key={index} data={recipe} />

          ))

            : "Loading..."
        }

      


    </>
  );
}

export default CategoryRecipes;