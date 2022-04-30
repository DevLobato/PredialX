const express = require("express")
const {PrismaClient} = require("@prisma/client")

const clientsRoutes = require("./client.routes")
const collabRoutes = require("./collaborator.routes")

const serviceOrderRoutes = express.Router()

const prisma = new PrismaClient()

// CRUD - CREATE / READ / UPDATE / DELETE

// POST method for Create Service Order
serviceOrderRoutes.post("/api/serviceOrder", async (req, res) => {
    const { problemDescription, client, collaborator } = req.body

    //Verifying if Client exists by Name
    const clientExists = await prisma.client.findFirst({where: {name: client}})

    const clientId = clientExists.id
    console.log(clientId)

    if(!clientExists)
        return res.status(403).json("Client doesn't exists, creation not authorized!")

    // Verifying if Collab exists
    const collaboratorExists = await prisma.collaborator.findFirst({where: {name: collaborator}})

    const collaboratorId = collaboratorExists.id
    console.log(collaboratorId)

    if(!collaboratorExists)
        return res.status(403).json("Collab doesn't exists, creation not authorized!")

    // Create Service Order
    const serviceOrder = await prisma.serviceOrder.create({ 
        data: { 
            problemDescription,
            Client: { connect: {id: clientId}},
            Collaborator: { connect: {id: collaboratorId}}            
        } 
    }) 

    return res.status(201).json(serviceOrder)
})

// GET method for ReadAll Service Order
serviceOrderRoutes.get("/api/serviceOrder", async (req, res) => {
    const serviceOrder = await prisma.serviceOrder.findMany()

    return res.status(200).json(serviceOrder)
})

// PUT method for Update Service Order [Can only update the Problem Description]
serviceOrderRoutes.put("/api/serviceOrder", async (req, res) => {
    const { id, problemDescription } = req.body

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const serviceOrderExists = await prisma.serviceOrder.findUnique( { where: {id} } )

    if(!serviceOrderExists)
        return res.status(403).json("Service Order doesn't exists, update not authorized!")

    const serviceOrder = await prisma.serviceOrder.update({
        where: {
            id, 
        },
        data: {
            problemDescription
        },
    })

    return res.status(200).json(serviceOrder)
})

// DELETE method for Update Service Order
serviceOrderRoutes.delete("/api/serviceOrder/:paramsId", async (req, res) => {
    const { paramsId } = req.params

    const id = parseInt(paramsId)

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const serviceOrderExists = await prisma.serviceOrder.findUnique( { where: {id} } )

    if(!serviceOrderExists)
        return res.status(403).json("Service Order doesn't exists, update not authorized!")

    await prisma.serviceOrder.delete({where: {id: id}})

    return res.status(204).send()   
})

module.exports = serviceOrderRoutes