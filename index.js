const express =require("express");
const http =require("http");
const { addUsers, removeUsers, getUsers, getUsersInRoom} = require("./entity");

const app =express();
const server=http.createServer(app);
//Express initializes app to be a function handler that you can supply to an HTTP server (as seen in line 4).
const port=process.env.PORT||8000;

const socketio= require("socket.io");
const cors = require('cors');
app.use(cors());
// const io=socketio(server,{
//     cors: {
//       origin: '*' }
//   });

//We define a route handler / that gets called when we hit our website home.
// app.get('/',(req,res)=>
//     res.json('I am not giving up!')
// );

io.on('connection',(socket)=>{
    console.log('User connected');
    //getting the user and room from front end
    socket.on('join',({name,room},callBack)=>{
        
        //
        const {user , error} = addUsers({id:socket.id,name: name,room: room})
        console.log(user);
        if(error){
            callBack(error)
            return;
        }
        //
        socket.join(user.room);

        socket.emit('message',{user:'admin',text:`Welcome ${user.name}`});

        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});

        io.to(user.room).emit('activeUsers',getUsersInRoom(user.room)); 

    })
    socket.on('sendMsg',(message,callBack)=>{
        const user =getUsers(socket.id);
        io.to(user.room).emit('message',{user:user.name,text:message}); 
       
       
        callBack()

    }) 
    socket.on('disconnect',()=>{
        console.log('User disconnnected');
        const user =removeUsers(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name} has left`});
            io.to(user.room).emit('activeUsers',getUsersInRoom(user.room)); 

        }
    });
});

if (process.env.NODE_ENV === 'production'){

    app.use(express.static('chatapp/build'));
}



//We make the http server listen on port 8000.
server.listen(port,()=>
    console.log(`Server started on ${port}`));