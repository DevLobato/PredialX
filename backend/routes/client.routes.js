const express = require("express")
const {PrismaClient} = require("@prisma/client")

const clientsRoutes = express.Router()
const prisma = new PrismaClient()

// CRUD - CREATE / READ / UPDATE / DELETE

// POST method for Create Client
clientsRoutes.post("/api/Client", async (req, res) => {
    const { name } = req.body
    const client = await prisma.client.create({ 
        data: { 
            name 
        } 
    })

    return res.status(201).json(client)
})

// GET method for ReadAll Client
clientsRoutes.get("/api/Client", async (req, res) => {
    const client = await prisma.client.findMany()

    return res.status(200).json(client)
})

// PUT method for Update Client
clientsRoutes.put("/api/Client", async (req, res) => {
    const { id, name } = req.body

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const clientExists = await prisma.client.findUnique( { where: {id} } )

    if(!clientExists)
        return res.status(403).json("Client doesn't exists, update not authorized!")

    const client = await prisma.client.update({
        where: {
            id, 
        },
        data: {
            name
        },
    })

    return res.status(200).json(client)
})

// DELETE method for Update Client
// clientsRoutes.delete("/api/Client/:id", (req, res) => {
//     const {id} = req.params

//     if(!id)
//         return res.status(400).json("Id is mandatory!")

//     const clientExists = await prisma.client.findUnique( { where: {id} } )

//     if(!clientExists)
//         return res.status(403).json("Client doesn't exists, update not authorized!")


// })

module.exports = clientsRoutes