// document.onload = () => {}
$(() => {
    var digitando = []
    const socket = io()
    console.log("Conectado ao servidor")

    $("form").submit(()=>{
        socket.emit('message',$("#texto").val())
        $("#texto").val("")
        return false
    })

    let lastTime = new Date().getTime()

    $("#texto").keydown(()=>{
        const interval = new Date().getTime() - lastTime
        if(interval > 800){
            socket.emit('status',`${socket.id} está digitando`)
            lastTime = Date().getTime()
        }
    })

    $("#texto").keyup(() => {
        const interval = new Date().getTime() - lastTime
        if(interval > 800){
            socket.emit('status',"")
            lastTime = Date().getTime()
        }
    })

    socket.on('message',(texto) => {
        $("#mensagens").append($("<li>").text(texto))
    })

    socket.on('status',(texto) => {
        $("#status").html(texto)
    })

    socket.on('login',(login) => {
        socket.login = login
    })
})