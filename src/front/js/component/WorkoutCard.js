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
        <div data-aos="fade-in" className="workout-card-container">
            <div className="recipe_card m-2">
                <div
                    className="workout-image-container"
                    onClick={() => store.token ? navigate(`/workout/${data.id}`) : navigate('/profile')}
                    style={{
                        position: "relative",
                        borderRadius: "15px",
                        overflow: "hidden",
                        aspectRatio: "1/1",
                        maxWidth: "300px"
                    }}
                >
                    <img
                        src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${data.images[0]}`}
                        alt={data.name}
                        className="workout-image"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                    />
                    <div className="image-overlay" style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        padding: "20px 15px 15px",
                        color: "white"
                    }}>
                        <h3 className="workout-name mb-2" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                            {data.name}
                        </h3>
                        <div className="d-flex align-items-center gap-2 mb-2">
                            <i className="fas fa-dumbbell"></i>
                            <span style={{ fontSize: "0.9rem" }}>{data.category}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <i className="fas fa-person-running"></i>
                            <div className="muscle-tags" style={{ fontSize: "0.8rem" }}>
                                {data.primaryMuscles.slice(0, 2).join(", ")}
                                {data.primaryMuscles.length > 2 && "..."}
                            </div>
                        </div>
                    </div>
                </div>
                {store.token && (
                    <div className="fav-button-container" style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        zIndex: 2
                    }}>
                        <button
                            onClick={(e) => handleFavorite(e, data)}
                            className="btn btn-favorite"
                            style={{
                                backgroundColor: "rgba(255,255,255,0.9)",
                                borderRadius: "50%",
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "none",
                                boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
                            }}
                            aria-label={store.favs.some(fav => fav.id === data.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                            <i className={`fa ${store.favs.some(fav => fav.id === data.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}
                                style={{ color: store.favs.some(fav => fav.id === data.id) ? "#dc3545" : "#6c757d" }}
                            />
                        </button>
                    </div>
                )}
            </div>
            <style jsx>{`
                .workout-card-container {
                    transition: transform 0.2s ease;
                }
                .workout-card-container:hover {
                    transform: translateY(-5px);
                }
                .workout-image-container {
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .workout-image-container:hover .image-overlay {
                    background: linear-gradient(transparent, rgba(0,0,0,0.8));
                }
                @media (prefers-color-scheme: dark) {
                    .btn-favorite {
                        background-color: rgba(33, 37, 41, 0.9) !important;
                    }
                    .btn-favorite i {
                        color: #fff !important;
                    }
                    .btn-favorite i.fa-solid {
                        color: #dc3545 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default WorkoutCard;