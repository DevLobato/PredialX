const express = require("express");
const { PrismaClient } = require("@prisma/client");

const clientsRoutes = express.Router();
const prisma = new PrismaClient();

// CRUD - CLIENT

// POST method for Create Client
clientsRoutes.post("/api/Client", async(req, res) => {
    const { name } = req.body;

    try {
        const client = await prisma.client.create({
            data: {
                name,
            },
        });

        return res.status(201).json(client);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// GET method for ReadAll Client
clientsRoutes.get("/api/Client", async(req, res) => {
    try {
        const client = await prisma.client.findMany();

        return res.status(200).json(client);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// PUT method for Update Client
clientsRoutes.put("/api/Client", async(req, res) => {
    const { id, name } = req.body;

    try {
        if (!id) return res.status(400).json("Id is mandatory!");

        const clientExists = await prisma.client.findUnique({ where: { id } });

        if (!clientExists)
            return res
                .status(403)
                .json("Client doesn't exists, update not authorized!");

        const client = await prisma.client.update({
            where: {
                id,
            },
            data: {
                name,
            },
        });

        return res.status(200).json(client);
    } catch (error) {
        return res.status(404).json(error);
    }
});

// DELETE method for Update Client
clientsRoutes.delete("/api/Client/:paramsId", async(req, res) => {
    const { paramsId } = req.params;
    const id = parseInt(paramsId);

    try {
        if (!id) return res.status(400).json("Id is mandatory!");

        const clientExists = await prisma.client.findUnique({ where: { id } });

        if (!clientExists)
            return res
                .status(403)
                .json("Client doesn't exists, update not authorized!");

        await prisma.client.delete({ where: { id: id } });

        return res.status(204).send();
    } catch (error) {
        return res.status(404).json(error);
    }
});

module.exports = clientsRoutes;