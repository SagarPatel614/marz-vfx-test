import React from "react";
import { create, ReactTestRenderer} from 'react-test-renderer';
import ProductItem from "./ProductItem";
import { Product } from "../interfaces";

describe('ProductItem', () => {
  let tree: ReactTestRenderer;
  const ID = 1234;
  const ProductName = 'Test';
  const ProductStatus = 'Active';
  const ProductPhotoURL = 'https://picsum.photos/id/21/600/400';

  beforeEach(() => {
    const props = {
        ProductID: ID,
        ProductName: ProductName,
        ProductStatus: ProductStatus,
        ProductPhotoURL: ProductPhotoURL
  } as Product;
    tree = create(<ProductItem {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersDraggableItem', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': `product-${ID}`});
    await testInstance.findByProps({ 'data-testid': `productName-${ProductName}`});
    await testInstance.findByProps({ 'data-testid': `productID-${ID}`});
  });
});