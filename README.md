# Team 25

### Front-end Structure

### Back-end Structure

For backend part we use Flask considering its lightweight and convinience.

### Database

#### Business DB

##### HotelTable

```json
{
    'id': int,
    'name': VARCHAR,
    'city': VARCHAR,
    'address': VARCHAR,
    'country': VARCHAR,
    'rating': float,
    'contact': int,
    'amenities': VARCHAR
}
```

##### RoomTable

```
{
    'id': int,
    'hotelid': int,
    'type': VARCHAR,
    'price': int,
    'startdate': DATE,
    'enddate': DATE,
    'capacity': int,
    'amenities': VARCHAR
}
```

##### TicketTable

```
{
    'id': int,
    'name': VARCHAR,
    'type': VARCHAR,
    'price': int,
    'date': DATE,
    'location': VARCHAR,
    'availability': int
}
```

##### FlightTable

```json
{
    'id': int,
    'airline': VARCHAR,
    'departure_airport': VARCHAR,
    'arrival_airport': VARCHAR,
    'departure_date_time': DATETIME,
    'arrival_date_time': DATETIME,
    'price': int,
    'availability': int,
}
```

#### User DB

##### UserInfo

```
{
    'id': int,
    'nickname': VARCHAR,
    'email': VARCHAR
}
```

##### FlightInfo

```
{
    'id': int,
    'userid': int,
    'airline': VARCHAR,
    'departure_airport': VARCHAR,
    'arrival_airport': VARCHAR,
    'departure_date_time': DATETIME,
    'arrival_date_time': DATETIME,
    'price': int,
}
```

##### HotelInfo

```
{
    'id': int,
    'hotelid': int,
    'type': VARCHAR,
    'price': int,
    'startdate': DATE,
    'enddate': DATE,
    'capacity': int,
    'amenities': VARCHAR,
    'userid': int
}
```

##### TicketInfo

```
{
    'id': int,
    'name': VARCHAR,
    'type': VARCHAR,
    'price': int,
    'date': DATE,
    'location': VARCHAR,
    'userid': int
}
```

