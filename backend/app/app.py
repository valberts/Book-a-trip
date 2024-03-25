
from flask import Flask
from flask_cors import CORS
from user import user
# from role import role

app = Flask(__name__)
CORS(app, supports_credentials=True)


# register blue print
app.register_blueprint(user, url_prefix='/user')
# app.register_blueprint(role, url_prefix='/role')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)