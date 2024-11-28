import React, {useState, useEffect} from "react";
import "./products.css";
import ProductCard from "./productCard";
import { useNavigate } from "react-router-dom";

const ProductsPage = ({username}) => {
    const [products, setProducts]=useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("/api/products"); 
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);
    return (
        <div id="productMain">
            <div id="filterBar">  
                
            </div>
            {products.map((product, index) => (
                <ProductCard
                    productId={product._id}
                    productName={product.productName}
                    productImage={product.productImage}
                    productDescription={product.productDescription}
                    price={product.price}
                    organisationName={product.organisationName}
                    splitRatio={product.splitRatio}
                    username={username}
                />
            ))}
            <div id="addProductButton" onClick={()=>{navigate('/postProduct')}}>Post a Product</div>
        </div>
    );
}

export default ProductsPage;