const express = require("express")
const {PrismaClient} = require("@prisma/client")

const collabRoutes = express.Router()
const prisma = new PrismaClient()

// CRUD - CREATE / READ / UPDATE / DELETE

/*Collaborator Model
model Collaborator {
    id           Int            @id @unique @default(autoincrement())
    name         String
    email        String         @unique
    password     String
    ServiceOrder ServiceOrder[]
  }
*/

// POST method for Create Collaborator
collabRoutes.post("/api/Collab", async (req, res) => {
    const { name, email, password } = req.body
    const collaborator = await prisma.collaborator.create({ 
        data: { 
            name,
            email,
            password 
        } 
    })

    return res.status(201).json(collaborator)
})

// GET method for ReadAll Collaborator
collabRoutes.get("/api/Collab", async (req, res) => {
    const collaborator = await prisma.collaborator.findMany()

    return res.status(200).json(collaborator)
})

// PUT method for Update Collaborator
collabRoutes.put("/api/Collab", async (req, res) => {
    const { id, name, email, password } = req.body

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const collaboratorExists = await prisma.collaborator.findUnique( { where: {id} } )

    if(!collaboratorExists)
        return res.status(403).json("collaborator doesn't exists, update not authorized!")

    const collaborator = await prisma.collaborator.update({
        where: {
            id, 
        },
        data: {
            name,
            email,
            password
        },
    })

    return res.status(200).json(collaborator)
})

// DELETE method for Update Collaborator
collabRoutes.delete("/api/Collab/:paramsId", async (req, res) => {
    const { paramsId } = req.params

    const id = parseInt(paramsId)

    if(!id)
        return res.status(400).json("Id is mandatory!")

    const collaboratorExists = await prisma.collaborator.findUnique( { where: {id} } )

    if(!collaboratorExists)
        return res.status(403).json("collaborator doesn't exists, update not authorized!")

    await prisma.collaborator.delete({where: {id: id}})

    return res.status(200).send()   
})

module.exports = collabRoutes