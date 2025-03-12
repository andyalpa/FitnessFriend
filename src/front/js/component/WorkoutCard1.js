import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";

const WorkoutCard = ({ data }) => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleFavorite = (e, exercise) => {
        e.preventDefault();
        const existing = store.favs.find(fav => fav.id === exercise.id && fav.type === "workout");
        existing ? actions.removeFav(exercise.id) : actions.addFav(exercise, "workout");
    };

    return (
        <div data-aos="fade-in">
            <div className="recipe_card m-2 d-flex" style={{ borderRadius: "1.25rem", boxShadow: "0px 0px 13px 10px rgba(112, 112, 112, 0.1)" }}>
                <div style={{width: "200px",height: "200px" }} onClick={() => store.token ? navigate(`/workout/${data.id}`) : navigate('/profile')}>
                    <img 
                        style={{width: "200px", height: "100%", objectFit: "cover", borderRadius: "1.25rem"}}
                        src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${data.images[0]}`} 
                        alt={data.name} 
        
                    />
                </div>
                <div className="ms-2">
                    <h3>{data.name}</h3>
                    <p><strong>Category:</strong> {data.category}</p>
                    <p><strong>Primary Muscles:</strong> {data.primaryMuscles.join(", ")}</p>
                </div>
                {store.token && (
                    <div className="fav-button-container">
                        <button 
                            onClick={(e) => handleFavorite(e, data)}
                            className="btn btn-warning ms-5"
                            style={{ borderRadius: "1.25rem" }}
                        >
                            <i className={`fa ${store.favs.some(fav => fav.id === data.id) ? 'fa-solid' : 'fa-regular'} fa-heart`} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutCard;