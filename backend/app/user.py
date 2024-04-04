#!/usr/bin/env python3
# -*- coding: UTF-8 -*-

from flask import Blueprint, jsonify, request
import pymysql
import os
import json

user = Blueprint("user", __name__)
db = pymysql.connect(
    host="db", user=os.environ["MYSQL_USER"], password=os.environ["MYSQL_PWD"], db="SA"
)
userTableCreateSql = """
CREATE TABLE IF NOT EXISTS UserInfo(
    id int(8) primary key auto_increment,
    email VARCHAR(30) not null unique,
    pwd VARCHAR(30) not null
)
"""


insertUserSql1 = """
INSERT INTO UserInfo (email, pwd) 
SELECT * FROM (SELECT 'tomcruise@gmail.com', 'password') AS tmp 
WHERE NOT EXISTS (
    SELECT email FROM UserInfo WHERE email = 'tomcruise@gmail.com'
) LIMIT 1;
"""
insertUserSql2 = """
INSERT INTO UserInfo (email, pwd) 
SELECT * FROM (SELECT 'willsmith@gmail.com', 'password') AS tmp 
WHERE NOT EXISTS (
    SELECT email FROM UserInfo WHERE email = 'willsmith@gmail.com'
) LIMIT 1;
"""


userFlightCreateSql = """
CREATE TABLE IF NOT EXISTS userFlightInfo(
    id int(8) primary key auto_increment,
    userid int(8),
    airline VARCHAR(20),
    departure_airport VARCHAR(20),
    arrival_airport VARCHAR(20),
    departure_date_time DATETIME,
    arrival_date_time DATETIME,
    price int(8)
)
"""

userHotelCreateSql = """
CREATE TABLE IF NOT EXISTS userHotelInfo(
    id int(8) primary key auto_increment,
    userid int(8),
    hotelid int(8),
    roomid int(8),
    type VARCHAR(20),
    price int(8),
    startdate DATE,
    enddate DATE,
    capacity int(8),
    amenities VARCHAR(20)
)
"""

userTicketCreateSql = """
CREATE TABLE IF NOT EXISTS userTicketInfo(
    id int(8) primary key auto_increment,
    userid int(8),
    name VARCHAR(20),
    type VARCHAR(20),
    price int(8),
    date DATE,
    location VARCHAR(20)
)
"""


@user.route("/login", methods=["POST"])
def login():
    login_data = request.json
    email = login_data.get("email")
    password = login_data.get("password")

    cursor = db.cursor()
    cursor.execute(userTableCreateSql)
    # Check if there are any rows returned
    if cursor.rowcount == 0:
        cursor.execute(insertUserSql1)  # Insert the user data
        cursor.execute(insertUserSql2)

    cursor.execute("SELECT * FROM UserInfo WHERE email = %s;", (email,))
    user = cursor.fetchone()

    if user:
        # User found, check password
        if (
            password == user[2]
        ):  # Assuming password is stored in the third column (change accordingly)
            return jsonify({"code": 200, "msg": "Login successful"})
        else:
            return jsonify({"code": 401, "msg": "Invalid credentials"})
    else:
        return jsonify({"code": 404, "msg": "User not found"})


@user.route("/userInfo", methods=["GET"])
def getUserInfo():
    """
    Get all users' information, for debugging purposes
    """
    cursor = db.cursor()
    cursor.execute(userTableCreateSql)

    if cursor.rowcount == 0:
        cursor.execute(insertUserSql1)  # Insert the user data
        cursor.execute(insertUserSql2)

    sql = "SELECT * FROM UserInfo;"
    cursor.execute(sql)
    result = cursor.fetchall()  # Fetch all rows
    print(result)

    if result:
        return jsonify(result)
    else:
        return jsonify({"error": "No users found"})


@user.route("/adduser", methods=["POST", "GET"])
def addUser():
    cursor = db.cursor()
    cursor.execute(userTableCreateSql)
    email = request.form.get("email")
    pwd = request.form.get("pwd")
    insertSql = "INSERT INTO UserInfo (email, pwd) VALUES (%s, %s);"
    try:
        cursor.execute(insertSql, (email, pwd))
        db.commit()
        return json.dumps({"code": 200, "msg": "success"})
    except pymysql.IntegrityError as e:
        print(e)
        return json.dumps({"code": 100, "msg": "Email already exists"})
    finally:
        cursor.close()


@user.route("/userBooking", methods=["POST", "GET"])
def userPlan():
    """
    username: the name of the user
    type: which info you want to retrive (hotel, ticket, flight)
    """
    userid = request.form.get("userid")
    searchtype = request.form.get("searchtype")
    cursor = db.cursor()
    # if type == "flight":
    #     cursor.execute(userFlightCreateSql)
    #     # sql = "select * from UserInfo where nickname = '" + username +"'"
    #     pass
    # elif type == "ticket":
    #     cursor.execute(userTicketCreateSql)
    #     pass
    if searchtype == "hotel":
        # cursor.execute(userHotelCreateSql)
        sql = "select * from RoomBookingInfo where userid =" + userid + ";"
        cursor.execute(sql)
        results = cursor.fetchall()
        # pass
        print(results)
        return jsonify(results)


@user.route("/get/")
def get_role():
    return "获取角色 \n"
