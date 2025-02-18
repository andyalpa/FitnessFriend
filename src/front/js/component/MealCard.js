import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const MealCard = ({ data }) => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleClick = (e, meal) => {
    e.preventDefault();
    const existingFav = store.favs.find(
      (fav) => fav.id === meal.idMeal && fav.type === "meal"
    );

    if (existingFav) {
      actions.removeFav(existingFav.id); // Remove favorite from backend
    } else {
      actions.addFav(meal, "meal"); // Add favorite to backend
    }
  };

  return (
    <>
      {!data ? (
        "No Meal Found"
      ) : (
        data.map((meal) => (
          <div
            data-aos="fade-in"
            key={meal.idMeal} // Use a unique identifier from the meal data
          >
            <div
              className="recipe_card m-2 d-flex"
              style={{
                borderRadius: "1.25rem",
                boxShadow: "0px 0px 13px 10px rgba(112, 112, 112, 0.1)",
              }}
            >
              {store.token ? (
                <div style={{width: "200px" }} onClick={() => navigate(`/meal/${meal.idMeal}`)}>
                  <img src={meal.strMealThumb} alt="/" />
                </div>
              ) : (
                <div onClick={() => navigate(`/profile`)}>
                  <img src={meal.strMealThumb} alt="/" />
                </div>
              )}

              <h3 className="ms-2">{meal.strMeal}</h3>
              {store.token ? (
                <div className="fav-button-container">
                  <a
                    onClick={(e) => handleClick(e, meal)}
                    style={{ borderRadius: "1.25rem" }}
                    href="#"
                    className="btn btn-warning ms-5"
                  >
                    <i
                      className={
                        store.favs.some(
                          (fav) => fav.id === meal.idMeal && fav.type === "meal"
                        )
                          ? "fa fa-solid fa-heart"
                          : "fa fa-regular fa-heart test"
                      }
                    ></i>
                  </a>
                </div>
              ) : (
                <div className="d-none"></div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};


export default MealCard;
