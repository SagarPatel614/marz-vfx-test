import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DraggableProductProps } from '../interfaces'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const DraggableProductItem = (props: DraggableProductProps) => (
    <Draggable draggableId={props.ProductID.toString()} index={props.ProductID}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="bg-neutral-300 flex items-center justify-between mt-1 p-3 rounded w-full"
                data-testid={`draggable-product-${props.ProductID}`}
            >
                <img src={props.ProductPhotoURL} alt={props.ProductName} className="w-16 h-16 object-cover rounded mr-3" />
                <span data-testid={`draggable-productID-${props.ProductID}`} className="font-bold">{props.ProductID}</span>
                <span data-testid={`draggable-productName-${props.ProductID}`} className="flex-1 ml-3">{props.ProductName}</span>
                <FontAwesomeIcon icon={faArrowsAlt} className="text-gray-600 fa-lg" />
            </div>
        )}
    </Draggable>
);

export default DraggableProductItem;
