const socket=io.connect()

function addMessage(){
    const user=document.getElementById('username').value
    const msg=document.getElementById('text').value
    if (user==="" || !msg==="") {
        alert("You may complete all the fields to start chatting");
        return false;
      }
    const message={
           user:user,
           text:msg,
       }
       socket.emit('newMsg', message)
       msg=""
       return false
   }  
  


socket.on('messages',(message)=>{
    let html=message
    .map(
        (msg)=>
        `<strong>${msg.user}</strong>
        <em>${msg.text}</em>`
    ).join("<br>")
    document.getElementById("messages").innerHTML=html
})
  

const createProductTable = async (products) => {
    const template = await (await fetch("views/table.hbs")).text();
    const templateCompiled = Handlebars.compile(template);
    return templateCompiled({ products });
  };


  const addProducts = ()=>{
    const title=document.getElementById('title').value
    const price=document.getElementById('price').value
    const thumbnail=document.getElementById('thumbnail').value
    if (title==="" || price==="" ) {
        alert("You may complete all fields to add a product");
        return false
      }
   
    const product={
        title:title,
        price:price,
        thumbnail:thumbnail,
    }
    socket.emit('newProd', product)
    title = "";
    price = "";
    thumbnail = "";
  }
  
  document.getElementById("add-product").addEventListener("click", addProducts);
 
 
  socket.on("products", async (products) => {
    const template = await createProductTable(products);
    document.getElementById("products").innerHTML = template;
  });