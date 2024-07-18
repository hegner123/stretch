
# Get home:
GET http://localhost:4000/api/sets/1
HTTP 200

POST http://localhost:4000/api/sets/1 
{
    "name":"",
    "timerOrder":"[]"
}

PUT http://localhost:4000/api/sets/2
{
    "name":"test",
    "timerOrder":"[]"
}

DELETE http://localhost:4000/api/sets/12
