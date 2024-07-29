import React from "react";
import { render, screen } from '@testing-library/react';
import ProductList from "./ProductList";
import { ProductData } from "../interfaces";

describe('ProductList', () => {
    it('rendersProductList', async () => {
        const props = {
            products: [
                {
                    "ProductID": 1,
                    "ProductName": "Hat",
                    "ProductPhotoURL": "https://picsum.photos/id/345",
                    "ProductStatus": "InActive"
                },
                {
                    "ProductID": 2,
                    "ProductName": "Shoes",
                    "ProductPhotoURL": "https://picsum.photos/id/145",
                    "ProductStatus": "Active"
                },
                {
                    "ProductID": 3,
                    "ProductName": "Pants",
                    "ProductPhotoURL": "https://picsum.photos/id/783",
                    "ProductStatus": "Active"
                },
                {
                    "ProductID": 4,
                    "ProductName": "Shirt",
                    "ProductPhotoURL": "https://picsum.photos/id/467",
                    "ProductStatus": "InActive"
                }
            ]
        } as ProductData;
        render(
            <ProductList {...props} />
        );
        expect(screen.getByTestId(`container-product-list-search`)).toBeInTheDocument();
        expect(screen.getByTestId(`container-product-list`)).toBeInTheDocument();
        expect(screen.getByTestId(`container-product-list-pagination`)).toBeInTheDocument();
        expect(screen.getByText(`1`)).toBeInTheDocument();
        expect(screen.getByText(`Pants`)).toBeInTheDocument();
    });
});
