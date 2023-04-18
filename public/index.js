// document.onload = () => {}
$(() => {
    const socket = io()
    console.log("Conectado ao servidor")

    $("form").submit(()=>{
        socket.emit('message',$("#texto").val())
        $("#texto").val("")
        return false
    })


    $("#texto").keydown(()=>{
        socket.emit('status',true)
    })


    $("#texto").keyup(()=>{
        socket.emit('status',false)
    })

    socket.on('message',(texto) => {
        $("#mensagens").append($("<li>").text(texto))
    })
})