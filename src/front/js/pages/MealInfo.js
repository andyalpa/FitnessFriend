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
        ""
      ) : (
        <div className="recipe-box card mb-3 m-5" style={{ minWidth: "540px", borderRadius: "1.25rem", boxShadow: "0px 0px 30px 7px rgba(0,0,0,0.1)"}}>
          <div className="row g-0" style={{ flexDirection: "row-reverse"}}>
            <div class="meal-info_header d-grid">
              <div style={{ "border-radius": "20px !important" }} className="col-md-4">
                <img style={{ borderRadius: "1.25rem", width: "300px" }} className="img-fluid" src={info.strMealThumb} alt={info.strMeal} />
              </div>
              <h1>{info.strMeal}</h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }} className="col-md-8">
              
              
              <div class="meal-body">
                <div class="meal-ingredients">
                  <h2>Ingredients</h2>
                  <ul className="list-group list-group-vertical">
                    {ingredientArray.map((ingredient, index) => (
                      <li style={{ width: "100%" }} class="list-group-item" key={index}>{ingredient} - {measureArray[index]} </li>
                    ))}
                  </ul>
                </div>
                <div class="meal-instructions">
                  <p>{info.strInstructions}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="tutorialVideo">
            <iframe src={`https://www.youtube.com/embed/${vId}`}
              title="Youtube video" allowFullScreen>

            </iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default MealInfo;
