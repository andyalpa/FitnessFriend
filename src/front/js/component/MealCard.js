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
      actions.removeFav(existingFav.id);
    } else {
      actions.addFav(meal, "meal");
    }
  };

  return (
    <>
      {!data ? (
        <div className="no-results">No Meals Found</div>
      ) : (
        data.map((meal) => (
          <div
            data-aos="fade-in"
            key={meal.idMeal}
            className="meal-card-container"
          >
            <div className="recipe_card m-2">
              <div
                className="meal-image-container"
                onClick={() => navigate(store.token ? `/meal/${meal.idMeal}` : '/profile')}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="meal-image"
                />
              </div>
              <h3 className="meal-name">{meal.strMeal}</h3>
              {store.token && (
                <div className="fav-button-container">
                  <button
                    onClick={(e) => handleClick(e, meal)}
                    className="btn btn-favorite"
                    aria-label={store.favs.some(
                      (fav) => fav.id === meal.idMeal && fav.type === "meal"
                    ) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <i
                      className={
                        store.favs.some(
                          (fav) => fav.id === meal.idMeal && fav.type === "meal"
                        )
                          ? "fa fa-solid fa-heart"
                          : "fa fa-regular fa-heart"
                      }
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default MealCard;
