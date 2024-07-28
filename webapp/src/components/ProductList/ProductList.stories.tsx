import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProductList from "./ProductList";
import { ProductData } from "../interfaces";

export default {
    title: 'Product List',
    component: ProductList,
} as ComponentMeta<typeof ProductList>;

const Template: ComponentStory<typeof ProductList> = (args) => <ProductList {...args} />;

const sample_data = [
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
]
const getArgs = (ProductStatus: 'Active' | 'InActive') => ({
    products: sample_data.filter(product => product.ProductStatus === ProductStatus)
} as ProductData );

export const Active = Template.bind({});
Active.args = getArgs('Active');

export const InActive = Template.bind({});
InActive.args = getArgs('InActive');



