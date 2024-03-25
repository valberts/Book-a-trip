# !/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import Blueprint

def register(app):
    # blueprint = Blueprint('user', __name__, static_folder='static', template_folder='templates')
    # app.register_blueprint(user, url_prefix='/user')
    return app