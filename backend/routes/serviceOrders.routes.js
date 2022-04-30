const express = require("express")
const {PrismaClient} = require("@prisma/client")

const clientsRoutes = require("./client.routes")
const collabRoutes = require("./collaborator.routes")

const serviceOrderRoutes = express.Router()

const prisma = new PrismaClient()

// CRUD - CREATE / READ / UPDATE / DELETE

/*
// ServiceOrder Model
model ServiceOrder {
  id                 Int          @id @unique @default(autoincrement())
  oppeningDate       DateTime     @default(now())
  Client             Client       @relation(fields: [ClientId], references: [id])
  ClientId           Int
  problemDescription String
  Collaborator       Collaborator @relation(fields: [CollaboratorId], references: [id])
  CollaboratorId     Int
}
*/

// POST method for Create Service Order

//JSON to Create 
/*
{
    "problemDescription": "detailed description",
    "clientName": "Vinicius",
    "collaboratorName": "Roger"
}

*/
serviceOrderRoutes.post("/api/serviceOrder", async (req, res) => {
    const { problemDescription, client, collaborator } = req.body

    const clientExists = await prisma.client.findFirst({where: {name: client}})

    if(!clientExists)
        return res.status(403).json("Client doesn't exists, creation not authorized!")

    const collabExists = await prisma.client.findFirst({where: {name: collaborator}})

    if(!collabExists)
    return res.status(403).json("Collab doesn't exists, creation not authorized!")

    const serviceOrder = await prisma.serviceOrder.create({ 
        data: { 
            problemDescription,
            client,
            collaborator,
            oppeningDate
        } 
    }) 

    return res.status(201).json()
})
/*
// GET method for ReadAll Service Order
serviceOrderRoutes.get("/api/serviceOrder", async (req, res) => {
    const client = await prisma.client.findMany()

    return res.status(200).json(client)
})

// PUT method for Update Service Order
serviceOrderRoutes.put("/api/serviceOrder", async (req, res) => {
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

// DELETE method for Update Service Order
serviceOrderRoutes.delete("/api/serviceOrder/:paramsId", async (req, res) => {
    const { paramsId } = req.params

    const id = parseInt(paramsId)

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const clientExists = await prisma.client.findUnique( { where: {id} } )

    if(!clientExists)
        return res.status(403).json("Client doesn't exists, update not authorized!")

    await prisma.client.delete({where: {id: id}})

    return res.status(200).send()   
})
*/
module.exports = serviceOrderRoutes