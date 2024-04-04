from flask import Blueprint, jsonify, request
import pymysql
import os
import json

business = Blueprint("business", __name__)

db = pymysql.connect(
    host="db", user=os.environ["MYSQL_USER"], password=os.environ["MYSQL_PWD"], db="SA"
)

hotelCreateSql = """
CREATE TABLE IF NOT EXISTS HotelInfo(
    id INT(8) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    city VARCHAR(20),
    address VARCHAR(30),
    rating INT,
    contact VARCHAR(20),
    amenities VARCHAR(50),
    imageUrl VARCHAR(100),
    intro VARCHAR(100),
    description TEXT,
    price INT
)
"""

hotelBusinessesCreateSql = """
INSERT INTO HotelInfo (name, city, address, rating, contact, amenities, imageUrl, intro, description, price) VALUES
('Royal Stay', 'Rotterdam', 'Market Square 10', 5, '010-1234567', 'Pool, Spa, Gym', '/images/image1.png', 'Step into a world of refined luxury and sophistication.', 'Discover a world of refined luxury and sophistication at Royal Stay, nestled in the heart of Rotterdam. Situated on Market Square, our hotel offers breathtaking views of the city skyline, setting the stage for an unforgettable experience. Indulge in unparalleled comfort and enjoy a range of amenities including a rejuvenating spa, state-of-the-art gym, and sparkling pool.', 200),
('Urban Retreat', 'Rotterdam', 'Grand Canal 25', 4, '010-2345678', 'Spa, Gym', '/images/image2.png', 'Escape to a tranquil sanctuary amidst the bustling city.', 'Find your sanctuary amidst the hustle and bustle of Rotterdam at Urban Retreat. Nestled along the serene Grand Canal, our boutique hotel invites you to unwind and recharge in style. Immerse yourself in tranquility with our state-of-the-art spa facilities and fully equipped gym, ensuring a rejuvenating experience like no other.', 180),
('The Greenhouse', 'Amsterdam', 'Tulip Lane 42', 4, '020-3456789', 'Pool, Free WiFi', '/images/image3.png', 'Experience eco-friendly luxury at its finest.', 'Embark on a journey of eco-friendly luxury at The Greenhouse, located in the heart of Amsterdam. Situated on Tulip Lane, our sustainable hotel seamlessly combines modern comfort with environmental responsibility. Enjoy a range of amenities including a refreshing pool and complimentary WiFi, all while minimizing your carbon footprint and contributing to a greener planet.', 220),
('City Lights', 'Amsterdam', 'Van Gogh Street 18', 3, '020-4567890', 'Free WiFi, Parking', '/images/image4.png', 'Discover the perfect blend of modern comfort and artistic inspiration.', 'Immerse yourself in the vibrant energy of Amsterdam at City Lights, where modern comfort meets artistic inspiration. Located on Van Gogh Street, our contemporary hotel offers stylish accommodations and convenient amenities such as complimentary WiFi and parking. Experience the rich cultural scene and retreat to a cozy haven at City Lights, where every stay is a celebration of Amsterdam’s creative spirit.', 150),
('Sea Breeze', 'Den Haag', 'Beach Avenue 7', 4, '070-1234567', 'Pool, Beach Access, Spa', '/images/image5.png', 'Escape to a world of seaside serenity and relaxation.', 'Experience the ultimate beachfront getaway at Sea Breeze, nestled along the picturesque shores of Den Haag. Located on Beach Avenue, our idyllic hotel offers breathtaking views of the coastline and direct access to the sandy beaches. Indulge in luxurious accommodations, take a dip in the pool, or pamper yourself with rejuvenating spa treatments. Discover a haven of relaxation and tranquility at Sea Breeze, where every moment is infused with seaside serenity.', 250),
('The Capital Inn', 'Den Haag', 'Palace Road 3', 5, '070-2345678', 'Gym, Luxury Spa, Pool', '/images/image6.png', 'Experience the epitome of opulent luxury and grandeur.', 'Experience a world of opulent luxury and grandeur at The Capital Inn, a beacon of sophistication in the heart of Den Haag. Situated on Palace Road, our majestic hotel offers a regal experience like no other. Indulge in lavish comforts including a fully equipped gym, luxurious spa, and heated indoor pool. Immerse yourself in the epitome of sophistication and elegance at The Capital Inn, where every detail is crafted to exceed your expectations.', 300);
"""


roomCreateSql = """
CREATE TABLE IF NOT EXISTS RoomInfo(
    id int(8) primary key auto_increment,
    hotelid int(8),
    type VARCHAR(20),
    price int(8),
    capacity int(8),
    amenities VARCHAR(20)
)
"""

roomBookingCreateSql = """
CREATE TABLE IF NOT EXISTS RoomBookingInfo(
    id int(8) primary key auto_increment,
    roomid int(8),
    userid int(8),
    startdate DATE,
    enddate DATE
)
"""

ticketCreateSql = """
CREATE TABLE IF NOT EXISTS TicketInfo(
    id int(8) primary key auto_increment,
    name VARCHAR(20),
    type VARCHAR(20),
    price int(8),
    date DATE,
    location VARCHAR(20),
    availability int(8)
)
"""


flightCreateSql = """
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
"""


@business.route("/hotel", methods=["POST", "GET"])
def searchHotel():
    cursor = db.cursor()
    cursor.execute(hotelCreateSql)

    # Check if the table is empty
    cursor.execute("SELECT COUNT(*) FROM HotelInfo")
    if cursor.fetchone()[0] == 0:  # If the table is empty
        cursor.execute(hotelBusinessesCreateSql)  # Insert the hotel data

    sql = "SELECT * FROM HotelInfo"
    cursor.execute(sql)
    results = cursor.fetchall()

    # Fetch column names from cursor description
    columns = [column[0] for column in cursor.description]

    # Convert to proper JSON format
    hotels = [dict(zip(columns, result)) for result in results]

    return (
        json.dumps(hotels),
        200,
        {"ContentType": "application/json"},
    )


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


@business.route("/roombooking", methods=["POST", "GET"])
def bookRoom():
    cursor = db.cursor()
    startdate = request.form.get("startdate")
    enddate = request.form.get("enddate")
    roomid = request.form.get("roomid")
    userid = request.form.get("userid")
    print(enddate)
    insertSql = "INSERT INTO RoomBookingInfo VALUES (NULL, '%s', '%s', '%s', '%s');" % (
        roomid,
        userid,
        startdate,
        enddate,
    )
    # # try:
    # cursor.execute(insertSql)
    try:
        cursor.execute(insertSql)
    except e:
        print(e)
        return json.dumps({"code": 100, "msg": "fail"})
    return json.dumps({"code": 200, "msg": "success"})


@business.route("/room", methods=["POST", "GET"])
def searchRoom():
    cursor = db.cursor()
    cursor.execute(roomCreateSql)
    cursor.execute(roomBookingCreateSql)
    startdate = request.form.get("startdate")
    enddate = request.form.get("enddate")
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
    searchSql = searchSql.replace("START_PLACEHOLDER", startdate).replace(
        "END_PLACEHOLDER", enddate
    )

    try:
        capacity = request.form.get("capacity")
        hotelid = request.form.get("hotelid")
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
