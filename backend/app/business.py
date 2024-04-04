from flask import Blueprint, jsonify, request
import pymysql
import os
import json

business = Blueprint('business', __name__)

db = pymysql.connect(host='localhost', user=os.environ["MYSQL_USER"], password=os.environ["MYSQL_PWD"], db='SA')

hotelCreateSql = '''
CREATE TABLE IF NOT EXISTS HotelInfo(
    id int(8) primary key auto_increment,
    name VARCHAR(20),
    city VARCHAR(20),
    address VARCHAR(30),
    country VARCHAR(20),
    rating FLOAT,
    contact VARCHAR(20),
    amenities VARCHAR(20)
)
'''

roomCreateSql = '''
CREATE TABLE IF NOT EXISTS RoomInfo(
    id int(8) primary key auto_increment,
    hotelid int(8),
    type VARCHAR(20),
    price int(8),
    capacity int(8),
    amenities VARCHAR(20)
)
'''

roomBookingCreateSql = """
CREATE TABLE IF NOT EXISTS RoomBookingInfo(
    id int(8) primary key auto_increment,
    roomid int(8),
    userid int(8),
    startdate DATE,
    enddate DATE
)
"""

ticketCreateSql = '''
CREATE TABLE IF NOT EXISTS TicketInfo(
    id int(8) primary key auto_increment,
    name VARCHAR(20),
    type VARCHAR(20),
    price int(8),
    date DATE,
    location VARCHAR(20),
    availability int(8)
)
'''


flightCreateSql = '''
CREATE TABLE IF NOT EXISTS FlightInfo(
    id int(8) primary key auto_increment,
    airline VARCHAR(20),
    departure_airport VARCHAR(20),
    arrival_airport VARCHAR(20),
    departure_date_time DATETIME,
    arrival_date_time DATETIME,
    price int(8),
    availability int(8)
)
'''


@business.route('/hotel', methods=['POST', 'GET'])
def searchHotel():
    # print(request)
    # username = request.form.get('username')
    # print(username)
    # return username
    cursor = db.cursor()
    cursor.execute(hotelCreateSql)
    sql = "select * from HotelInfo"
    cursor.execute(sql)
    results = cursor.fetchall()
    return json.dumps(results)


# CREATE TABLE IF NOT EXISTS RoomBookingInfo(
#     id int(8) primary key auto_increment,
#     roomid int(8),
#     userid int(8),
#     hotelid int(8),
#     startdate DATE,
#     enddate DATE,
#     price int(8),
#     type VARCHAR(20),
#     capacity int(8),
#     amenities VARCHAR(20)
# )

@business.route('/roombooking', methods=['POST', 'GET'])
def bookRoom():
    cursor = db.cursor()
    startdate = request.form.get('startdate')
    enddate = request.form.get('enddate')
    roomid = request.form.get('roomid')
    userid = request.form.get('userid')
    print(enddate)
    insertSql = "INSERT INTO RoomBookingInfo VALUES (NULL, '%s', '%s', '%s', '%s');" % (roomid, userid, startdate, enddate)
    # # try:
    # cursor.execute(insertSql)
    try:
        cursor.execute(insertSql)
    except e:
        print(e)
        return json.dumps({
            'code': 100,
            "msg": "fail"
        })
    return json.dumps({
        'code': 200,
        "msg": "success"
    })

@business.route('/room', methods=['POST', 'GET'])
def searchRoom():
    cursor = db.cursor()
    cursor.execute(roomCreateSql)
    cursor.execute(roomBookingCreateSql)
    startdate = request.form.get('startdate')
    enddate = request.form.get('enddate')
    searchSql = """
    SELECT * FROM RoomInfo r WHERE NOT EXISTS ( SELECT 1
    FROM RoomBookingInfo b
    WHERE r.id = b.roomid
    AND (
        (b.startdate >= 'START_PLACEHOLDER' AND b.startdate <= 'END_PLACEHOLDER')
        OR (b.enddate >= 'START_PLACEHOLDER' AND b.enddate <= 'END_PLACEHOLDER')
        OR (b.startdate <= 'START_PLACEHOLDER' AND b.enddate >= 'END_PLACEHOLDER')
    )
    )"""
    searchSql = searchSql.replace("START_PLACEHOLDER", startdate).replace('END_PLACEHOLDER', enddate)

    try:
        capacity = request.form.get('capacity')
        hotelid = request.form.get('hotelid')
    except:
        capacity = 0
        hotelid = -1
    # sql = "select * from RoomInfo where startdate < " + startdate + " AND enddate > " + enddate + " AND capacity > " + capacity
    cursor.execute(searchSql)
    results = cursor.fetchall()
    print(results)
    return json.dumps(results)

# @business.route('/ticket', methods=['POST', 'GET'])
# def searchTicket():
#     cursor = db.cursor()
#     sql = "select * from TicketInfo"
#     cursor.execute(sql)
#     results = cursor.fetchall()
#     return jsonify(results)

# @business.route('/flight', methods=['POST', 'GET'])
# def searchFlight():
#     cursor = db.cursor()
#     dport = request.form.get('departure_airport')
#     sport = request.form.get('arrival_airport')
#     sql = "select * from FlightInfo where departure_airport = " + dport + " AND arrival_airport = " + sport
#     cursor.execute(sql)
#     results = cursor.fetchall()
#     return jsonify(results)
