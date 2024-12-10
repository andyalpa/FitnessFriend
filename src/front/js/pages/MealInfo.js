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
        <div>
          <img src={info.strMealThumb} alt={info.strMeal} />
          <h1>{info.strMeal}</h1>
          <p>{info.strInstructions}</p>

          <h2>Ingredients</h2>
          <ul>
            {ingredientArray.map((ingredient, index) => (
              <li key={index}>{ingredient} - {measureArray[index]} </li>
              ))}
          
          </ul>
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
