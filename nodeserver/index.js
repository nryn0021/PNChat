//Node Server which will handle socket io connections
const io = require('socket.io')(8000)

const users ={}

io.on('connection', socket=>{           // instance which listens to all diffrent connection
    socket.on('user-joined',name =>{    // handles particular connection
 
    })
})


