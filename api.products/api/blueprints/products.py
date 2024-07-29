from flask import Blueprint, request
from flasgger import swag_from
import os
from marshmallow import ValidationError
from api.models import Product
from api.schemas import ProductSchema

products_blueprint = Blueprint('products_blueprint', __name__)


@products_blueprint.route('/all', methods=['GET'])
@swag_from({
    'tags': ['Products'],
    'summary': 'Retrieve all products',
    'description': 'This endpoint retrieves all products from the database and returns them in a serialized format.',
    'responses': {
        200: {
            'description': 'A list of all products',
            'schema': {
                'type': 'object',
                'properties': {
                    'data': {
                        'type': 'array',
                        'items': {
                            '$ref': '#/definitions/Product'
                        }
                    },
                    'message': {
                        'type': 'string',
                        'description': 'An additional message, usually empty if the operation is successful'
                    }
                }
            }
        },
        500: {
            'description': 'Internal Server Error',
            'schema': {
                'type': 'object',
                'properties': {
                    'data': {
                        'type': 'array',
                        'items': {
                            'type': 'object'
                        }
                    },
                    'message': {
                        'type': 'string',
                        'description': 'A message describing the error'
                    }
                }
            }
        }
    }
})
def get_all_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200


@products_blueprint.route('/update_status', methods=['POST'])
@swag_from({
    'tags': ['Products'],
    'summary': 'Update product status',
    'description': 'Update the status of a product based on the provided ProductID.',
    'requestBody': {
        'required': True,
        'content': {
            'application/json': {
                'schema': {
                    '$ref': '#/definitions/Product'
                }
            }
        }
    },
    'responses': {
        '200': {
            'description': 'Product status updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': '1 updated successfully!'
                    }
                }
            }
        },
        '400': {
            'description': 'No product data provided',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': 'No product data provided!'
                    }
                }
            }
        },
        '422': {
            'description': 'Validation error',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': '{"ProductName": ["Missing data for required field."]}'
                    }
                }
            }
        },
        '500': {
            'description': 'Internal Server Error',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {
                        'type': 'string',
                        'example': 'Database connection failed'
                    }
                }
            }
        }
    }
})
def post_update_product_status():
    product_schema = ProductSchema()
    json_data = request.get_json()
    if not json_data:
        return { 'message': 'No order data provided!' }, 400
    try:
        product = product_schema.load(json_data)
        Product.update(**product).where(
            Product.ProductID == product['ProductID']
        ).execute()
    except ValidationError as err:
        return { 'message': err.messages }, 422
    except Exception as err:
        return { 'message': str(err) }, 500
    return { 'message': f'{product["ProductID"]} updated successfully!' }, 200
