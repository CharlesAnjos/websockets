const express = require("express")
const app = express()
app.use(express.static("public"))

const http = require("http").createServer(app)

//const newServer = require("socket.io")
//const serverSocket = newServer()
const serverSocket = require("socket.io")(http)

const PORT = process.env.PORT || 6969
http.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`))

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"))

serverSocket.on('connection', (socket) => {
    console.log(`Cliente ${socket.id} conectou`)

    socket.on('login', (login) => {
        var mensagem = `${socket.id} escolheu um nome: ${socket.login}`
        serverSocket.emit("message", mensagem)
    })

    socket.on('message', (texto) => {
        console.log(`${socket.id} diz: ${texto}`)
        var mensagem = `${socket.id} diz: ${texto}`
        serverSocket.emit("message", mensagem)
    })

    socket.on('status', (status) => {
        socket.broadcast.emit("status", status)
    })
})