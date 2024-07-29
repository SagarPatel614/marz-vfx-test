import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProductItem from "./ProductItem";

export default {
    title: 'Product Item',
    component: ProductItem,
} as ComponentMeta<typeof ProductItem>;

const Template: ComponentStory<typeof ProductItem> = (args) => <ProductItem {...args} />;

const getArgs = (ProductStatus: 'Active' | 'InActive') => ({
    ProductID: 1234,
    ProductName: 'Test',
    ProductStatus,
    ProductPhotoURL: 'https://picsum.photos/id/21/600/400'
});

export const Active = Template.bind({});
Active.args = getArgs('Active');

export const InActive = Template.bind({});
InActive.args = getArgs('InActive');
