import React from "react";

const WorkoutCategories = ({ categories, onSelectCategory }) => {
    return (
        <div className="categories-container">
            {categories.map((category) => (
                <button
                    key={category}
                    className="cat_button p-3"
                    onClick={() => onSelectCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default WorkoutCategories;