import { useState } from "react";
import {foodList} from "./data";

export default function favorite(){
    const [index,setIndex] = useState(0);

    function handleClick(){
        setIndex(index +1);
        if (index == 5){
            setIndex(0);
        }
    }

    function handleClick2(){
        setIndex(index -1);
        if (index == 0){
            setIndex(0);
        }
    }

    





    let food = foodList[index];
    return(
        <>
        <button onClick={handleClick}>
            Next
        </button>
        <button onClick={handleClick2}>
            Back
        </button>
        <h2>
            <i>{food.name}</i> by {food.food}
        </h2>
        <h3>
            ({index +1} of {foodList.length})
        </h3>
        <img
        src={food.url}
        alt={food.alt}
        />
        <p>
            {food.description}
        </p>

        </>

    );
}