import React from "react";
import { Product } from "../interfaces";

const ProductItem = (props: Product) => (
    <div
        className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-neutral-200 dark:bg-neutral-100"
        data-testid={`product-${props.ProductID}`}
    >
        <img className="w-full" src={props.ProductPhotoURL} alt={props.ProductName} />
        <div 
            className="font-bold text-xl mb-2 flex items-center text-black dark:text-gray-950"
            data-testid={`productName-${props.ProductName}`}
        >
            {props.ProductName}
        </div>
        <p 
            className="text-gray-100 dark:text-black text-base"
            data-testid={`productID-${props.ProductID}`}
        >
            ID: {props.ProductID}
        </p>
    </div>
);

export default ProductItem;