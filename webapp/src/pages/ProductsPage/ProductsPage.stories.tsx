import React from "react";
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from "./ProductsPage";
import { PRODUCT_URL, UPDATE_PRODUCT_STATUS_URL } from "../ApiHelper";

export default {
    title: 'Products Page',
    component: ProductsPage,
    decorators : [(Story) => (<MemoryRouter><Story/></MemoryRouter>)]
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 200,
            response: {
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
                    {
                        "ProductID": 4,
                        "ProductName": "Shirt",
                        "ProductPhotoURL": "https://picsum.photos/id/467",
                        "ProductStatus": "InActive"
                    },
                    {
                        "ProductID": 5,
                        "ProductName": "Coat",
                        "ProductPhotoURL": "https://picsum.photos/id/75",
                        "ProductStatus": "Active"
                    },
                    {
                        "ProductID": 6,
                        "ProductName": "Scarf",
                        "ProductPhotoURL": "https://picsum.photos/id/610",
                        "ProductStatus": "Active"
                    },
                    {
                        "ProductID": 7,
                        "ProductName": "Glasses",
                        "ProductPhotoURL": "https://picsum.photos/id/649",
                        "ProductStatus": "Active"
                    },
                    {
                        "ProductID": 8,
                        "ProductName": "Caps",
                        "ProductPhotoURL": "https://picsum.photos/id/29",
                        "ProductStatus": "Active"
                    }
                ],
                message: ""
            },
        },
        {
            url: UPDATE_PRODUCT_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 200,
            response: {
                data: [],
                message: ""
            },
        },
        {
            url: UPDATE_PRODUCT_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
    mockData: [
        {
            url: PRODUCT_URL,
            method: 'GET',
            status: 500,
            response: {
                data: [],
                message: "Error"
            }
        },
        {
            url: UPDATE_PRODUCT_STATUS_URL,
            method: 'POST',
            status: 200,
            response: {
                data: {
                    message: 'Success',
                },
            },
        },
    ],
};
