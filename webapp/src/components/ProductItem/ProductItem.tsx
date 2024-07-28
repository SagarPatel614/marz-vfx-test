import React from "react";
import { Product } from "../interfaces";

const ProductItem = (props: Product) => (
    <div
        className="max-w-sm rounded overflow-hidden shadow-lg p-4"
        data-testid={`product-${props.ProductID}`}
    >
        <img className="w-full" src={props.ProductPhotoURL} alt={props.ProductName} />
        <div 
            className="font-bold text-xl mb-2 flex items-center"
            data-testid={`productName-${props.ProductName}`}
        >
            {props.ProductName}
        </div>
        <p 
            className="text-gray-400 text-base"
            data-testid={`productID-${props.ProductID}`}
        >
            ID: {props.ProductID}
        </p>
    </div>
);

export default ProductItem;