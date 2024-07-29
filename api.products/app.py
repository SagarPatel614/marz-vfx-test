from flask import Flask
from flasgger import Swagger
from api.blueprints.products import products_blueprint
from api.models import db

_URL_PREFIX = '/api'
PRODUCTS_URL = f"{_URL_PREFIX}/products"

app = Flask(__name__)
# Configure the Swagger documentation URL
app.config['SWAGGER'] = {
    'title': 'Product API',
    'uiversion': 3,
    'swagger_ui': True,
    'specs_route': '/productapidocs/'
}

Swagger(app, template_file='/api.products/swagger_docs/swagger_config.yml')


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
