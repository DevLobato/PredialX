const express = require("express")

const clients = []

const clientsRoutes = express.Router()

// CRUD - CREATE / READ / UPDATE / DELETE
// POST method for Create Client
clientsRoutes.post("/api/create-client", (req, res) => {
    const id = Math.floor((Date.now().toString())/100)
    console.log(id)

    const {name} = req.body
    clients.push({name, id})

    return res.status(201).json(clients)
})

// GET method for Client
clientsRoutes.get

module.exports = clientsRoutes