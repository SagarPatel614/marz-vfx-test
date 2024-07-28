import React from 'react';
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen, waitFor} from '@testing-library/react';
import { PRODUCT_URL } from '../ApiHelper';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';


describe("ProductsPage", () => {
    it("shouldDisplayLoadingSpinner", () => {
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
    });
    it("shouldDisplayPipelineContainer", async() => {
        // set up mock for axios.get
        const response = {
            data: [
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
            ],
            message: ""
        };
        const server = setupServer(
          rest.get(PRODUCT_URL, (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId(`pipeline-container`)).toBeInTheDocument();
        });
        server.close();
    });
    it("shouldDisplayErrorMessage", async() => {
        // set up mock for axios.get
        const response = {
            data: [],
            message: "Error"
        };
        const server = setupServer(
          rest.get(PRODUCT_URL, (req, res, ctx) => {
            return res(ctx.status(500), ctx.json(response));
          })
        );
        server.listen();
        render(
            <MemoryRouter>
                <ProductsPage />
            </MemoryRouter>
        );
        
        await waitFor(() => {
            expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
        });
        server.close();
    });
});