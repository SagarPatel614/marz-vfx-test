from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return "Products API Home"


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
