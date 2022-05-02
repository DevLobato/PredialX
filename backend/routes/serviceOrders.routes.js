const express = require("express")
const {PrismaClient} = require("@prisma/client")

const clientsRoutes = require("./client.routes")
const collabRoutes = require("./collaborator.routes")

const serviceOrderRoutes = express.Router()

const prisma = new PrismaClient()

// CRUD - SERVICE ORDER

// POST method for Create Service Order
serviceOrderRoutes.post("/api/serviceOrder", async (req, res) => {
    const { problemDescription, client, collaborator } = req.body

    //Verifying if Client exists by Name
    const clientExists = await prisma.client.findFirst({where: {name: client}})

    const clientId = clientExists.id

    if(!clientExists)
        return res.status(403).json("Client doesn't exists, creation not authorized!")

    // Verifying if Collab exists
    const collaboratorExists = await prisma.collaborator.findFirst({where: {name: collaborator}})

    const collaboratorId = collaboratorExists.id

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
    const serviceOrder = await prisma.serviceOrder.findMany({
        orderBy: {
            id: 'asc'
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order ordered by Client
serviceOrderRoutes.get("/api/serviceOrder/orderByClient", async (req, res) => {
    const serviceOrder = await prisma.serviceOrder.findMany({
        orderBy: {
            Client: {
                id: 'asc'
            }
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order ordered by Collaborator
serviceOrderRoutes.get("/api/serviceOrder/orderByCollaborator", async (req, res) => {
    const serviceOrder = await prisma.serviceOrder.findMany({
        orderBy: {
            Collaborator: {
                id: 'asc'
            }
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order ordered by Date
serviceOrderRoutes.get("/api/serviceOrder/orderByDate", async (req, res) => {
    const serviceOrder = await prisma.serviceOrder.findMany({
        orderBy: {
            oppeningDate: 'asc'
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order filtering by Client
serviceOrderRoutes.get("/api/serviceOrder/filterByClient", async (req, res) => {
    const {name} = req.body

    const serviceOrder = await prisma.serviceOrder.findMany({
        where: {
            Client: {
                name: {
                    contains: name
                }
            }
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order filtering by Collaborator
serviceOrderRoutes.get("/api/serviceOrder/filterByCollaborator", async (req, res) => {
    const {name} = req.body

    const serviceOrder = await prisma.serviceOrder.findMany({
        where: {
            Collaborator: {
                name: {
                    contains: name
                }
            }
        }
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order filtering by Period
serviceOrderRoutes.get("/api/serviceOrder/filterByPeriod", async (req, res) => {
    const {take, initialDate, finalDate} = req.body

    const serviceOrder = await prisma.serviceOrder.findMany({
        take: Number(take) || undefined,
        where: {
            oppeningDate: {
                gte: initialDate,
                lte: finalDate
            }
        } 
    })

    return res.status(200).json(serviceOrder)
})

// GET method for ReadAll Service Order with Pagination 
serviceOrderRoutes.get("/api/serviceOrder/pag", async (req, res) => {
    const {take} = req.body

    const serviceOrder = await prisma.serviceOrder.findMany({
        take: Number(take) || undefined,
        orderBy: {
            id: 'asc'
        }
    })

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