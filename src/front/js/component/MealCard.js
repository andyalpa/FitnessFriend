import React from "react";
import { useNavigate } from "react-router-dom";




const MealCard = ({ data }) => {
    let navigate = useNavigate()
    console.log(data);

    return (
        <>
            {
                (!data) ? "No Meal Found " : data.map((meal, index) => {
                    return (
                        <div className="recipe_card" key={index} onClick={() => {
                            navigate(`/${meal.idMeal}`)
                        }}>
                            <img src={meal.strMealThumb} alt="/" />
                            <h3>{meal.strMeal}</h3>
                        </div>

                    )
                })
            }







        </>
    );
}

export default MealCard;