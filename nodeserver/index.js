//Node Server which will handle socket io connections
const cors = require('cors');
const io = require("socket.io")(8000, {
  cors: {}
});
const users ={};
io.on('connection', socket=>{           // instance which listens to all diffrent connection //all for new event
    socket.on('new-user-joined', name =>{    // handles particular connection
        console.log(name,"Has Joined The Chat");
        users[socket.id] = name; 
        socket.broadcast.emit('user-joined', name);             //brodcast tro everyone except himself  
    });

    socket.on('send-msg',message =>{
        socket.broadcast.emit('deliver-msg',{message: message, name: users[socket.id]})
     });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
   });
})



