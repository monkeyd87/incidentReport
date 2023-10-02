const express = require('express')
const db = require('./connection')
const http = require('http');
const cors = require('cors')
const {authenticateToken} = require('./auth')
const path  = require('path')
const socketIo = require('socket.io');

const {Student,ClassRoom} = require('./models');


const port = process.env.PORT || 8000

const app = express()
app.use(express.json())
app.use(cors({
    origin:'*'
}))


 
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(process.cwd(), "../client/build")));
  }
 
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../client/build/index.html"));
//   });

app.use('/api',require('./routes/api'))
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
    },)

io.on('connection',async(socket)=>{
   

    socket.on('disconnect', () => {
        console.log('A client disconnected');
    })
})






server.listen(port,()=>console.log('running on port'+' '+port))