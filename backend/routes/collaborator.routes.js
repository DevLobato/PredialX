const express = require("express");
const { PrismaClient } = require("@prisma/client");

const collabRoutes = express.Router();
const prisma = new PrismaClient();

// CRUD - COLLBORATOR

// POST method for Create Collaborator
collabRoutes.post("/api/Collab", async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const collaborator = await prisma.collaborator.create({
            data: {
                name,
                email,
                password,
            },
        });

        return res.status(201).json(collaborator);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// GET method for ReadAll Collaborator
collabRoutes.get("/api/Collab", async(req, res) => {
    try {
        const collaborator = await prisma.collaborator.findMany();

        return res.status(200).json(collaborator);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// PUT method for Update Collaborator
collabRoutes.put("/api/Collab", async(req, res) => {
    const { id, name, email, password } = req.body;

    try {
        if (!id) return res.status(400).json("Id is mandatory!");

        const collaboratorExists = await prisma.collaborator.findUnique({
            where: { id },
        });

        if (!collaboratorExists)
            return res
                .status(403)
                .json("collaborator doesn't exists, update not authorized!");

        const collaborator = await prisma.collaborator.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                password,
            },
        });

        return res.status(200).json(collaborator);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// DELETE method for Update Collaborator
collabRoutes.delete("/api/Collab/:paramsId", async(req, res) => {
    const { paramsId } = req.params;

    const id = parseInt(paramsId);

    try {
        if (!id) return res.status(400).json("Id is mandatory!");

        const collaboratorExists = await prisma.collaborator.findUnique({
            where: { id },
        });

        if (!collaboratorExists)
            return res
                .status(403)
                .json("collaborator doesn't exists, update not authorized!");

        await prisma.collaborator.delete({ where: { id: id } });

        return res.status(204).send();
    } catch (error) {
        return res.status(404).json(error);
    }
});

module.exports = collabRoutes;