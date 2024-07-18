# Get home:
GET http://localhost:4000/api/timer/1
HTTP 200

POST http://localhost:4000/api/timer/1 
{
    "timer":{
        "userId":1,
        "setId":2,
        "timeMs":2000,
        "type": "stretch"
    }
}


POST http://localhost:4000/api/timer/1 
{
    "timer":{
        "userId":1,
        "setId":2,
        "timeMs":2000,
        "type": "stretch"
    }
}

#PUT http://localhost:4000/api/timer/1
#{
#    "timeMs":1500,
#    "type":"stretch"
#}

#DELETE http://localhost:4000/api/timer/3


