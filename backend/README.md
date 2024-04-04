## User API

### Get User Info

POST

http://127.0.0.1:8888/user/userInfo/\<fill username here\>

##### Curl example

###### Request

```
curl -X POST http://127.0.0.1:8888/user/userInfo/test4
```

###### Response

```
[
  [
    4, - userid
    "test4", - username
    "test@email", - useremail
    "encrypted" - user encrypted pwd
  ]
]

```

#### Add User

POST

##### form data

```
{
	"nickname": user name,
	"email"： user email,
	"pwd": user encrypted pwd, plz encrypt it in the frontend and only send the encrypted version through network
}
```

##### Curl example

###### Request

```
curl -X POST http://127.0.0.1:8888/user/adduser -F 'nickname=test4' -F 'email=test@email' -F 'pwd=encrypted'
```

###### Response

```
{"code": 200, "msg": "success"} on success
or 
{"code": 100, "msg": "fail"} on fail
```

### Search User Booking

POST

#### form data

```
{
	"userid": the id of current user,
	"searchtype": hotel/tickekt/.. now only for hotel
}
```

##### Curl example

###### Request

```
curl -X POST http://127.0.0.1:8888/user/userBooking -F 'userid=1' -F 'searchtype=hotel'
```

###### Response

```
[
  [
    1, - booking id
    1, - room id
    1, - user id
    "Tue, 02 Apr 2024 00:00:00 GMT", - booking start date
    "Fri, 05 Apr 2024 00:00:00 GMT" - booking end data
  ]
]

```

## Business API

### Search Hotels

##### Curl example

###### Request

```
curl http://127.0.0.1:8888/business/hotel
```

###### Response

```
[
  [
    1, - hotel id
    "test1_name", - hotel name
    "test1_city", - hotel location city
    "test1_addr", - hotel addr
    "test1_country", - hotel country
    4.8, - hotel rating
    "test1_contact", - hotel contact info
    "test1_amenity" - hotel amenities
  ],
  [
    2,
    "test2_name",
    "test2_city",
    "test2_addr",
    "test2_country",
    4.8,
    "test2_contact",
    "test2_amenity"
  ]
]

```

### Room Search

POST

#### form data

```
{
	"startdate": user startdate for booking,
	"enddate": user end date for booking
}
```

##### Curl example

###### Request

```
curl -X POST http://127.0.0.1:8888/business/room -F 'startdate=2024-04-02' -F 'enddate=2024-04-05'
```

###### Response

```
[
  [
    2, - room id
    1, - hotel id
    "test2_type", - room type
    100, - room price/per night
    4, - room capacity
    "test2_amenity" - room amenities
  ],
  [
    3,
    2,
    "test1_type",
    100,
    2,
    "test1_amenity"
  ]
]

```

### Room Booking

POST

#### form data

```
{
	"startdate": user startdate for booking,
	"enddate": user end date for booking,
	"roomid": the room id that user want to book,
	"userid": the id of the user
}
```

##### Curl example

###### Request

```
curl -X POST http://127.0.0.1:8888/business/roombooking -F 'startdate=2024-04-02' -F 'enddate=2024-04-05' -F 'roomid=1' -F 'userid=1'
```

###### Response

```
{"code": 200, "msg": "success"} on success
or 
{"code": 100, "msg": "fail"} on fail
```

