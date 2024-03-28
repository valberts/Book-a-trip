from flask import Blueprint, jsonify
import pymysql
import os

business = Blueprint('business', __name__)