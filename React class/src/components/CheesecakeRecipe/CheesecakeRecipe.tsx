import { useState } from "react";
import "./CheesecakeRecipe.css";
type CheesecakeRecipeProps = {
    title: string;
    image: string;
    instructions: string;
};

export const CheesecakeRecipe: React.FC<CheesecakeRecipeProps> = ({ title, image, instructions }) => {
    const [show, setShow] = useState(true);
    return (
        <>
            <h1>{title}</h1>
            <img src={image} alt="" />
            {show && <p id="instructions">{instructions}</p>}
            <button onClick={() => setShow(!show)}>{!show ? "show instructions" : "hide instructions"}</button>
        </>
    )
}
