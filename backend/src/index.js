const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")
const { runSimulationRealtime } = require("./buffer")

const app = express()
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: { origin: "*" }
})

let simulationStarted = false

io.on("connection", (socket) => {
  console.log("Cliente conectado")

  // Iniciar simulación SOLO una vez
  if (!simulationStarted) {
    runSimulationRealtime(io)
    simulationStarted = true
  }
})

server.listen(3000, () => {
  console.log("Server is running on port 3000")
})