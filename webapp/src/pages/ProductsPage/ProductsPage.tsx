import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { AllProductData } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { getProductsData } from "../ApiHelper";
import ProductList from "../../components/ProductList/ProductList";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({Active: {products: []}, InActive: {products: []}} as AllProductData);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductsData();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded) 
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="pipeline-container"
      >
        <h2 className="text-2xl font-bold mb-4">Active Products</h2>
        <ProductList {...data.Active} />
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      { content }
    </PageWrapper>
  );
};

export default ProductsPage;
