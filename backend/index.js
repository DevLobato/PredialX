// Importando o Express
// Arquivo inicial do Projeto
const express = require("express")
const clientsRoutes = require("./routes/client.routes")

const app = express()
const port = "3030"

app.use(express.json())
app.use(clientsRoutes)

app.get("/api/server", (req, res) => {
    return res.json("Server is Up")
})

app.listen(port, () => { console.log(`Server is listening to the port ${port}`) })