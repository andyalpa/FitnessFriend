import React from "react";
import { useNavigate } from "react-router-dom";




const MealCard = ({ data }) => {
    let navigate = useNavigate()
    console.log(data);

    return (
        <>
            {
                (!data) ? "No Meal Found " : data.map((meal, index) => {

                        <div className="recipe_card m-2 d-flex" style={{ borderRadius: "1.25rem", boxShadow: "0px 0px 10px 3px rgba(0,0,0,0.1)" }} key={index} onClick={() => {
                            navigate(`/${meal.idMeal}`)
                        }}>
                            <img src={meal.strMealThumb} alt="/" />
                            <h3 className="ms-2">{meal.strMeal}</h3>
                            
                        </div>

                    )
                })
            }
{/* className="recipe_card " */}
        </>
    );
}

export default MealCard;