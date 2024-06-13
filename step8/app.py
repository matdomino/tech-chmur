from flask import Flask, jsonify, make_response

app = Flask(__name__)

@app.route('/')
def hello():
    response = {
        "status": "success",
        "message": "Hello, World!"
    }
    return make_response(jsonify(response), 200)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
