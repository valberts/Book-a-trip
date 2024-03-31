# Book a Trip - Team 25

We propose a system which enables people to organise trips and travel within The Netherlands with lower barriers. Our goal is to centralise all the parts of booking a trip, including transportation, lodging, and tickets for points of interest.

## Front-end Structure

For the frontend we use Next.js and Tailwind CSS.

### Running

### Front End

Install the packages.

`npm install`

Run the local development server.

`npm run dev`

### Back End

- install the packages

  `pip install -r requirements.txt`

- install mysql

- set `MYSQL_USER` and `MYSQL_PWD` in the environment

- `cd /backend/app`

- run `python/python3 app.py`

### Back-end Structure

For backend part we use Flask considering its lightweight and convinience.

## Database

### Business DB

#### HotelTable

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

#### RoomTable

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

#### TicketTable

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

#### FlightTable

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

### User DB

#### UserInfo

```
{
    'id': int,
    'nickname': VARCHAR,
    'email': VARCHAR
}
```

#### FlightInfo

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

#### HotelInfo

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

#### TicketInfo

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
