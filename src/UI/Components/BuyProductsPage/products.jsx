import React from "react";
import "./products.css";
import ProductCard from "./productCard";

export const ProductsPage = () => {
    const products = [
        {
            "productName": "Wireless Bluetooth Headphones",
            "productImage": "https://example.com/images/bluetooth_headphones.jpg",
            "productDescription": "High-quality wireless headphones with noise-cancelling feature and up to 20 hrs of battery life.",
            "price": 59.99
        },
        {
            "productName": "Smartwatch",
            "productImage": "https://example.com/images/smartwatch.jpg",
            "productDescription": "Fitness tracking smartwatch with heart rate monitor and GPS functionality.",
            "price": 129.99
        },
        {
            "productName": "Laptop Sleeve",
            "productImage": "https://example.com/images/laptop_sleeve.jpg",
            "productDescription": "Sleek and protective laptop sleeve suitable for 13-15 inch laptops.",
            "price": 25.99
        },
        {
            "productName": "4K Ultra HD Monitor",
            "productImage": "https://example.com/images/4k_monitor.jpg",
            "productDescription": "27-inch 4K UHD monitor with HDR and ultra-thin bezel design.",
            "price": 299.99
        }
    ]
    return (
        <div id="productMain">
            <div id="filterBar">
                
            </div>
            {products.map((product, index) => (
                <ProductCard
                    key={index}
                    productName={product.productName}
                    productImage={product.productImage}
                    productDescription={product.productDescription}
                    price={product.price}
                />
            ))}
        </div>
    );
}

export default ProductsPage;