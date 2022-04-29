const express = require("express")

const clients = []

const clientsRoutes = express.Router()

// CRUD - CREATE / READ / UPDATE / DELETE

// POST method for Create Client
clientsRoutes.post("/api/createClient", (req, res) => {
    const id = Math.floor((Date.now().toString())/100)

    const {name} = req.body
    clients.push({name, id})

    return res.status(201).json(clients)
})

// GET method for ReadAll Client
clientsRoutes.get("/api/readAllClients", (req, res) => {
    return res.status(200).json(clients)
})

// PUT method for Update Client
// clientsRoutes.put("/api/updateClient", (req, res) => {

// })

module.exports = clientsRoutes