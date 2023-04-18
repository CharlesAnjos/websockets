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


    $("#texto").keydown(()=>socket.emit('status',`${socket.id} está digitando`))
    $("#texto").keyup(() => setTimeout(() => socket.emit('status',""), 2000))

    socket.on('message',(texto) => {
        $("#mensagens").append($("<li>").text(texto))
    })

    socket.on('status',(texto) => {
        $("#status").html(texto)
    })
})