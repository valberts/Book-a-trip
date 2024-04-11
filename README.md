# Book a Trip - Team 25

We propose a system which enables people to organise trips and travel within The Netherlands with lower barriers. Our goal is to centralise all the parts of booking a trip, including transportation, lodging, and tickets for points of interest.

## Running

### Frontend

Install the packages.

`npm install`

Run the local development server.

`npm run dev`

### Backend

#### Running with Docker

`cd backend`

`docker-compose up --build`

#### Running manually

-   install the packages

    `pip install -r requirements.txt`

-   install mysql

-   set `MYSQL_USER` and `MYSQL_PWD` in the environment

-   `cd /backend/app`

-   run `python/python3 app.py`

## Proof of Concept

The proof of concept showcases a vertical slice of the proposed full architecture. It is focused on the hotel booking aspect and leverages a microservice architecture to reflect the sysem's flexibility and scalability. This demonstrates that other services such as booking transportation, museums, and generating itineraties could be built similarly and run alongside the current PoC.

### Functionality

-   Searching for hotels
    -   Search for hotels based on location by querying the database of hotels.
-   Booking management
    -   Users can book rooms directly through the interface, see their bookings, and cancel bookings.
-   Login and Authentication
    -   Users are able to login, logout, create bookings under their account, and fetch only bookings registered to their account

### Further Work

-   Create and integrate remaining services
-   Create an API gateway that will redirect requests to the correct microservice
-   Allow businesses to create, edit, and delete their business information, used to facilitate bookings

## Frontend

The frontend is built with Next.js and Tailwind CSS.

## Backend

The backend is built with Flask because it is lightweight and convenient. It is also Dockerized and ran as a container so that it can be deployed anywhere and have its resources scaled as needed.

### Business API Endpoints

#### 1. Search Hotels

-   **Method**: `GET`
-   **URL**: `http://localhost:8888/business/hotel?city=`
-   **Query Parameters**:
    -   `city` (optional): The city to filter hotels by.
-   **Response**:
    -   **200 OK**: Returns a JSON array of hotel objects.
    -   Each hotel object contains `id`, `name`, `city`, `address`, `rating`, `contact`, `amenities`, `imageUrl`, `intro`, `description`, `price`.

#### 2. Book Room

-   **Method**: `POST`
-   **URL**: `http://localhost:8888/business/bookroom`
-   **Request Body** (application/json):
    ```json
    {
      "hotelId": int,
      "startDate": "YYYY-MM-DD",
      "nights": int,
      "guests": int,
      "totalPrice": int,
      "email": "string"
    }
    ```
-   **Response**:
    -   **200 OK**: Returns a success message with booking details.
    ```json
    {
        "code": 200,
        "msg": "Booking successful"
    }
    ```

#### 3. Cancel Booking

-   **Method**: `DELETE`
-   **URL**: `http://localhost:8888/business/cancelbooking`
-   **Request Body** (application/json):
    ```json
    {
      "bookingId": int
    }
    ```
-   **Response**:
    -   **200 OK**: Booking cancelled successfully.
    ```json
    {
        "code": 200,
        "msg": "Booking cancelled successfully"
    }
    ```
    -   **400 Bad Request**: Booking ID is required.
    ```json
    {
        "code": 400,
        "msg": "Booking ID is required"
    }
    ```
    -   **404 Not Found**: Booking not found.
    ```json
    {
        "code": 404,
        "msg": "Booking not found"
    }
    ```

#### 4. Get User Bookings

-   **Method**: `POST`
-   **URL**: `http://localhost:8888/business/getbookings`
-   **Request Body** (application/json):
    ```json
    {
        "email": "string"
    }
    ```
-   **Response**:
    -   **200 OK**: Returns a JSON array of booking objects associated with the user's email.
    -   Each booking object contains `id`, `hotelId`, `startDate`, `nights`, `guests`, `totalPrice`, `email`.

---

### User API Endpoints

#### 1. User Login

-   **Method**: `POST`
-   **URL**: `http://localhost:8888/user/login`
-   **Request Body** (application/json):
    ```json
    {
        "email": "user@example.com",
        "password": "password123"
    }
    ```
-   **Responses**:
    -   **200 OK**: Login successful.
        ```json
        {
            "code": 200,
            "msg": "Login successful"
        }
        ```
    -   **401 Unauthorized**: Invalid credentials.
        ```json
        {
            "code": 401,
            "msg": "Invalid credentials"
        }
        ```
    -   **404 Not Found**: User not found.
        ```json
        {
            "code": 404,
            "msg": "User not found"
        }
        ```

#### 2. Add User

-   **Method**: `POST`
-   **URL**: `http://localhost:8888/user/adduser`
-   **Request**: Expects form data with 'email' and 'pwd' fields.
-   **Responses**:
    -   **200 OK**: User addition successful.
        ```json
        {
            "code": 200,
            "msg": "success"
        }
        ```
    -   **100 Custom Error**: Email already exists.
        ```json
        {
            "code": 100,
            "msg": "Email already exists"
        }
        ```

---

### Database

#### Business DB

##### HotelInfo

```
{
    'id': INT,
    'name': VARCHAR,
    'city': VARCHAR,
    'address': VARCHAR,
    'rating': INT,
    'contact': VARCHAR,
    'amenities': VARCHAR,
    'imageUrl': VARCHAR,
    'intro': VARCHAR,
    'description': TEXT,
    'price': INT
}
```

##### RoomBookingInfo

```
{
    'id': INT,
    'hotelid': INT,
    'startDate': DATE,
    'nights': INT,
    'guests': INT,
    'totalPrice': INT,
    'email': VARCHAR
}
```

<!-- #### TicketTable

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
``` -->

#### User DB

##### UserInfo

```
{
    'id': INT,
    'email': VARCHAR,
    'pwd': VARCHAR
}
```

<!--
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
``` -->
