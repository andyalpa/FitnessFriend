import React, { useEffect, useState } from "react";
import FeaturedRecipes from "./FeaturedRecipes";
import MealCategories from "../pages/MealCategories";
import MealCard from "./MealCard";

const Meal = () => {
    const [url, setUrl] = useState("");
    const [meal, setMeal] = useState([]);
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        async function getRecipe() {
            try {
                let res = await fetch(url);
                let data = await res.json();
                setMeal(data.meals);
                setShow(true);
            } catch (error) {
                console.error("Error fetching recipes:", error);
                setShow(true);
            }
        }
        if (url) {
            getRecipe();
        }
    }, [url]);

    const catIndex = (cat) => {
        setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        setSelectedCategory(cat);
    };

    const searchRecipe = (e) => {
        if (e.key === 'Enter') {
            setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            setSelectedCategory("search");
        }
    };

    return (
        <div className="main">
            <div
                className="heading"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1543339308-43e59d6b73a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`
                }}
            >
                <h1 className="header">Discover Delicious Recipes</h1>
                <h2 className="subheader">Find your next culinary adventure</h2>
                <div className="search--box">
                    <input
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={searchRecipe}
                        type="search"
                        className="input"
                        placeholder="Search for recipes..."
                        aria-label="Search recipes"
                    />
                    <i className="fas fa-search search-icon"></i>
                </div>
            </div>

            <div className="container">
                <div className="categories">
                    <MealCategories catIndex={catIndex} />
                </div>

                <div className="recipes_grid">
                    {selectedCategory === null && <FeaturedRecipes />}
                    {show && meal ? (
                        <MealCard data={meal} />
                    ) : (
                        <div className="no-results">No recipes found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Meal;