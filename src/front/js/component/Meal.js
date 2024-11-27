import React, { useEffect, useState } from "react";
import MealCard from "./MealCard";
import RecipeLetters from "./RecipeLetters";
import MealCategories from "../pages/MealCategories";
import FeaturedRecipes from "/workspaces/pt72-Fitness_Friend/src/front/js/component/FeaturedRecipes.js"

const Meal = () => {
    const [url, setUrl] = useState("");
    const [meal, setMeal] = useState([])
    const [show, setShow] = useState(false)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {
        async function getRecipe() {
            let res = await fetch(url);
            let data = await res.json();
            console.log(data);
            setMeal(data.meals);
            setShow(true)


        }
        getRecipe();
    }, [url])

    // const letterIndex = (letter) => {
    //     setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)

    // }

    const catIndex = (cat) => {
        setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
        setSelectedCategory(cat)
    }

    const searchRecipe = (e) => {
        if (e.key == 'Enter')
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            setSelectedCategory("search")
    }
    return (
        <>
            <div className="main text-center">
                

                <div className="heading">
                    <h1>Search Recipe</h1>
                    <h4>Lorem20 dsf sdf sdfds fdsf dsfds fdsfdsf sdfsdf sdfsdf
                        dsfsdfsdfdsfdsfsdfdsfsdfsdfdsv xcvfsdfsd sdfsdf sdfsdf
                        dsfdsvsddv dsfsd fdsfdsf
                    </h4>
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">@</span>
                        <input onChange={(e) => setSearch(e.target.value)} onKeyDown={searchRecipe} type="search" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                    </div>
                </div>
                <div className="categories text-center d-flex">
                    <MealCategories catIndex={(cat) => catIndex(cat)} />
                </div>

                <div className="">
                    {selectedCategory === null && <FeaturedRecipes />}  
                    {show ? <MealCard data={meal} /> : "Not found"}
                    
                    
                </div>
                     
                {/* Recipes Sort by Letters */}
                {/* <div className="lettersContainer">
                <RecipeLetters letterIndex={(letter) => letterIndex(letter)}/>
            </div> */}


            </div>


        </>

    );
}
// https://github.com/Valerieclaire96/whoKnows
export default Meal;