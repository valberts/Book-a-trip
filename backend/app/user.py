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
    nickname VARCHAR(20),
    email VARCHAR(30) not null,
    pwd VARCHAR(30) not null
)
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


@user.route("/userInfo/<username>", methods=["POST", "GET"])
def searchUser(username):
    """
    For user login and information retrival. Will return the encrypted passwd
    """
    cursor = db.cursor()
    cursor.execute(userTableCreateSql)
    sql = "select * from UserInfo where nickname = '" + username + "';"
    cursor.execute(sql)
    results = cursor.fetchall()
    print(results)

    return jsonify(results)

    # id int(8) primary key auto_increment,
    # nickname VARCHAR(20),
    # email VARCHAR(30) not null
    # pwd VARCHAR(30) not null


@user.route("/adduser", methods=["POST", "GET"])
def addUser():
    cursor = db.cursor()
    cursor.execute(userTableCreateSql)
    nickname = request.form.get("nickname")
    email = request.form.get("email")
    pwd = request.form.get("pwd")
    insertSql = "INSERT INTO UserInfo VALUES (NULL, '%s', '%s', '%s');" % (
        nickname,
        email,
        pwd,
    )
    # # try:
    # cursor.execute(insertSql)
    print(insertSql)
    try:
        cursor.execute(insertSql)
    except e:
        print(e)
        return json.dumps({"code": 100, "msg": "fail"})
    return json.dumps({"code": 200, "msg": "success"})


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
