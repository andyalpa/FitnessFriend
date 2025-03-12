import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealInfo = () => {
  const { MealId } = useParams();
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function getInfo() {
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`);
      let data = await res.json();
      console.log(data);
      setInfo(data.meals[0]);
    }
    getInfo();
  }, [MealId]);

  const ingredientArray = Object.keys(info)
    .filter(key => key.startsWith('strIngredient') && info[key])
    .map(key => info[key]);

  const measureArray = Object.keys(info)
    .filter(key => key.startsWith('strMeasure') && info[key])
    .map(key => info[key]);

  const videoId = () => {
    let vId = '';
    if (info) {
      const videoUrl = info.strYoutube;
      if (videoUrl) {
        const videoStr = videoUrl.split('=');
        vId = videoStr[videoStr.length - 1];
      }
    }
    return vId;
  };

  const vId = videoId()

  return (
    <>
      {!info ? (
        <div className="loading">Loading...</div>
      ) : (
        <div data-aos="fade-in" className="recipe-box card mb-3 m-5" style={{ minWidth: "540px", borderRadius: "1.25rem" }}>
          <div style={{ flexDirection: "row-reverse" }}>
            <div className="meal-info_header d-flex">
              <div data-aos="fade-up-left" style={{ borderRadius: "20px" }}>
                <img style={{ borderRadius: "1.25rem", width: "300px" }} className="img-fluid" src={info.strMealThumb} alt={info.strMeal} />
              </div>
              <h1 data-aos="fade-down-right" className="meal-title">{info.strMeal}</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className="meal-body my-3">
                <div data-aos="fade-right" className="meal-ingredients">
                  <h2 className="section-title">Ingredients</h2>
                  <ul className="list-group list-group-vertical">
                    {ingredientArray.map((ingredient, index) => (
                      <li className="list-group-item" key={index}>
                        {ingredient} - {measureArray[index]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div data-aos="fade-left" className="meal-instructions ps-4">
                  <h2 className="section-title">Instructions</h2>
                  <p className="instructions-text">{info.strInstructions}</p>
                </div>
              </div>
            </div>
          </div>
          <div data-aos="zoom-out-up" className="video-section">
            <h2 className="section-title">Video Tutorial</h2>
            <div className="tutorialVideo corner-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${vId}`}
                title="Youtube video"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MealInfo;