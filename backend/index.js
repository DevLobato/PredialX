// Main route
const express = require("express")
const cors = require("cors")

// Project Route imports
const clientsRoutes = require("./routes/client.routes")
const collabRoutes = require("./routes/collaborator.routes")
const serviceOrderRoutes = require("./routes/serviceOrders.routes")

const app = express()
const port = "3030" //Defining port 

app.use(express.json())
app.use(cors())

//Project Routes
app.use(clientsRoutes)
app.use(collabRoutes)
app.use(serviceOrderRoutes)

//Testing if server is running
app.get("/api/server", (req, res) => {
    return res.json("Server is Up")
})

// Configuring app to listen to the defined port
app.listen(port, () => { console.log(`Server is listening to the port ${port}`) })