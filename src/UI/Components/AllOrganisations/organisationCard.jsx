import React, { useState, useEffect } from "react";
// import "./products.css";
import { useNavigate } from "react-router-dom";

export const ProductsCard = ({ name,
    image,
    tagline,
    organisation,
    setShowNonprofit}) => {
        const navigate = useNavigate();

    return (
        <div className="productcard" onClick={()=>{setShowNonprofit(name);navigate('/about')}}>
            <div className="card-img"><img src={image}></img></div>
            <div className="card-info">
                <p className="text-title">{name} </p>
                <p className="text-body">{tagline}</p>
            </div>
            </div>
    );
}

export default ProductsCard;