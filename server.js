const express=require ('express')
const {Server:HttpServer}=require('http')
const {Server:IOServer}=require('socket.io')
const  app=express()
const httpServer=new HttpServer(app)
const io=new IOServer(httpServer)


let products=[]
let messages=[]
app.use(express.urlencoded({extended: true}))
//app.use(express.static('public'))

const PORT=8080 || process.env.PORT
const server=httpServer.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
})
app.use(express.static('public'))
server.on('error' ,error=>console.log(`Error in the server ${error}`))

io.on('connection', (socket)=>{

    console.log(`New client connected ${socket.id}`)
    socket.emit('products', products)
    socket.emit('messages', messages)
    socket.on('newMsg', message=>{
    messages.push(message)
    io.sockets.emit('messages', messages)
})
 
    socket.on('newProd', product=>{
    products.push(product)
    io.sockets.emit('products',products)
})
})






