
const express=require('express');
var app=express();
const article=require("./models/article");
const mongoose=require('mongoose');
const User =require('./models/user');

app.use(express.json());



app.get("/hello",(req,res)=>{
    // res.send("Hello World");
    res.render("test.pug",{
        name:"Zin ",
        numbers:233
    })
})
app.get("/hi",(req,res)=>{
  //console.log(req.query)
 // res.send(`hahah ${req.query.age}`)
  res.json({
    name:req.body.name,
    age:req.query.age,
    prenom:"ziin",
    
  })


})
app.get("/add",(req,res)=>{
    //res.send("post on add")
    res.sendFile(__dirname+"/Views/test.html")
})
app.delete("/delete",(req,res)=>{
    res.send("hi deleted")
})

app.get("/findinformation/:number1/:number2",(req,res)=>{
    const num=req.params.number1;
    const num2=req.params.number2;
    const total=Number(num)+Number(num2)
    res.send(`les nombres sont ${total}`)
    console.log(req.params)
    

    
   
})
app.get("/saywinner",(req,res)=>{
    // console.log(req.body)
    // res.send(`hello my beauty ${req.body.name}`)
    res.send("<h1>momm</h1>")

})

app.post("/users", async(req,res)=>{
    const newUser= new User()
    const title=req.body.title;
    const gmail=req.body.gmail;
    
    newUser.name=title
    newUser.gmail=gmail
   newUser.password=123456
    await newUser.save()
    res.send("yes you can ")
})

const url="mongodb://0.0.0.0:27017/local";

(async ()=>{
    await mongoose.connect(url)
    console.log("Connected to db")
})()

app.post("/articles", async (req,res)=>{

  const art=req.body.artictitle;
  const artbody=req.body.articbody;

    const newArticle =new article()
    newArticle.title=art
    newArticle.body=artbody
    newArticle.numberOfLikes=100
   await newArticle.save();
    res.send("articless")
})
app.get("/users", async(req,res)=>{
 
   const users=await User.find();
   console.log(users)
   res.json(users)

})
app.get("/showusers",async (req,res)=>{
    const user=await User.find()
res.render("response.pug",{
   allUsers:user
})

})



app.listen(3000,()=>{console.log("listening in port 3000")});