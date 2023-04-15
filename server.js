const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { query, run } = require('./services/db')

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/ping", (req, res) => {
    res.json({"message": "pong"})
})


app.get("/api/rooms", (req, res) => {
    res.json(query("select * from Rooms;"))
})

app.get("/api/prices", (req, res) => {
    res.json(query("select * from Prices;"))
})

app.get("/api/records", (req, res) => {
    let res_ = query("SELECT sum(total) as total from Records where createdAt = (select max(createdAt) from Records)")
    res.json(res_)
})

app.post("/api/records", (req, res) => {
    console.log(req.body)
    const {roomId, roomType, players, selectedTime, startTime, endTime, actualTime, total, createdAt} = req.body
    let res_ = run("insert into Records(roomId, roomType, players, selectedTime, startTime, endTime, actualTime, total, createdAt) values (@roomId, @roomType, @players, @selectedTime, @startTime, @endTime, @actualTime, @total, @createdAt)", {roomId, roomType, players, selectedTime, startTime, endTime, actualTime, total, createdAt})
    console.log(res_)
})

app.put("/api/prices", (req, res) => {
    const payload = req.body

    let fs = require("fs")

    fs.writeFile("../common/prices.json", JSON.stringify(payload, null, 2), (err) => {
        if (err) {
            res.status(403).json({"message": "error"})
        }else{
            res.status(204).json({"message": "written successfully"})
        }
    })
})

app.put("/api/rooms", (req, res) => {
    let _rooms = require('../common/rooms.json');
    const payload = req.body

    let new_rooms = _rooms.rooms.map(room => room.id == payload.id ? payload : room)
    let new_data = {
        "rooms": new_rooms
    }

    let fs = require("fs")

    fs.writeFile("../common/rooms.json", JSON.stringify(new_data, null, 2), (err) => {
        if (err) {
            res.status(403).json({"message": "error"})
        }else{
            res.status(204).json({"message": "written successfully"})
        }
    })
})

app.post("/api/records", (req, res) => {
    const payload = req.body

    console.log(payload)
})

app.listen(3002, "0.0.0.0", () => {
    console.log("Server running on port 3002")
})


