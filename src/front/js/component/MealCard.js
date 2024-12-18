import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const MealCard = ({ data }) => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleClick = async (e, meal) => {
    e.preventDefault();
    const existingFav = store.favs.find(
      (fav) => fav.name === meal.strMeal && fav.type === "meal"
    );
  
    if (existingFav) {
      actions.removeFav(existingFav.id); // Remove favorite from backend
    } else {
      // Send request to backend to add favorite
      const response = await actions.addFav({ name: meal.strMeal }, "meal");
      if (response.success) {
        // Update local state with new favorite (if applicable)
        store.dispatch({ type: 'ADD_FAVORITE', payload: response.data }); // assuming your store uses Redux 
        console.log("Favorite added successfully!");
      } else {
        console.error("Error adding favorite:", response.error);
      }
    }
  };

  return (
    <>
      {!data
        ? "No Meal Found"
        : data.map((meal, index) => {
            return (
              <div key={index} data-aos="fade-in">
                <div
                  className="recipe_card m-2 d-flex"
                  style={{
                    borderRadius: "1.25rem",
                    boxShadow: "0px 0px 13px 10px rgba(0,0,0,0.1)",
                  }}
                  key={index}
                >
                  {store.token ? (
                    <div
                      onClick={() => {
                        navigate(`/meal/${meal.idMeal}`);
                      }}
                    >
                      <img src={meal.strMealThumb} alt="/" />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        navigate(`/profile`);
                      }}
                    >
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
                              (fav) =>
                                fav.idMeal === meal.idMeal && fav.type === "meal"
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
            );
          })}
    </>
  );
};

export default MealCard;
