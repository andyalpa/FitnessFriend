import React from "react";


const RecipeLetters = ({letterIndex}) => {  
    let letters = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    
    return ( 
        <>
            {
                letters?.map((letter, index)=> {
                    return (
                        <div className="box" key={index} onClick={() => letterIndex(letter)}>
                            <h3>
                                {letter}
                            </h3>
                        </div>
                    )
                })
            }
        
        
        </>

     );
}
 
export default RecipeLetters;