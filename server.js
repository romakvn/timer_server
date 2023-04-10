const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

let app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/api/rooms", (req, res) => {
    let _rooms = require('../common/rooms.json');
    res.json(_rooms)
})

app.get("/api/prices", (req, res) => {
    let prices = require('../common/prices.json').prices;
    res.json(prices)
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

app.listen(3001, () => {
    console.log("Server running on port 3001")
})
