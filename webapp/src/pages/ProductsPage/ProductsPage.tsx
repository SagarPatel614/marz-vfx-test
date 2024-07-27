import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { Product, ProductData } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { DragDropContext } from "react-beautiful-dnd";
import { getProductsData } from "../ApiHelper";
import DraggableProductList from "../../components/DraggableProductList/DraggableProductList";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({Active: [], InActive: []} as ProductData);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductsData();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  const updateProduct = async (product: Product) => {
    // TODO: Handle the update to the product details upon the change in the list?
    setLoadingState(DATA_STATES.loaded);
  };

  const handleDragEnd = (result: any) => {
    // TODO: upon drag complete update the status of the product
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
        {<DragDropContext onDragEnd={handleDragEnd}>
          <DraggableProductList 
            ID='0'
            listTitle='Active'
            updateStatus={(product: Product) => updateProduct(product)}
            items={data.Active}
          />
          <DraggableProductList 
            ID='1'
            listTitle='InActive'
            updateStatus={(product: Product) => updateProduct(product)}
            items={data.InActive}
          />
        </DragDropContext> }
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
