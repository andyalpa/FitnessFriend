import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const WorkoutCard = ({ data }) => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const existingFav = store.favs.find(
      (fav) => fav.id === data.id && fav.type === "workout"
    );

    if (existingFav) {
      actions.removeFav(existingFav.id);
    } else {
      actions.addFav(data, "workout");
    }
  };

  if (!data) {
    return <div>No Workout Found</div>;
  }

  return (
    <div data-aos="fade-in" key={data.id}>
      <div
        className="recipe_card m-2 d-flex"
        style={{
          borderRadius: "1.25rem",
          boxShadow: "0px 0px 13px 10px rgba(0,0,0,0.1)",
        }}
      >
        {store.token ? (
          <div onClick={() => navigate(`/workout/${data.id}`)}>
            <img src={data.gifUrl} alt={data.name} />
          </div>
        ) : (
          <div onClick={() => navigate(`/profile`)}>
            <img src={data.gifUrl} alt={data.name} />
          </div>
        )}

        <h3 className="ms-2">{data.name}</h3>
        {store.token ? (
          <div className="fav-button-container">
            <a
              onClick={handleClick}
              style={{ borderRadius: "1.25rem" }}
              href="#"
              className="btn btn-warning ms-5"
            >
              <i
                className={
                  store.favs.some(
                    (fav) => fav.id === data.id && fav.type === "workout"
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
};

export default WorkoutCard;

