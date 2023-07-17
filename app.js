const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port=9000;
const app = express();


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/LoginDetails');
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

//Define mongoose schema
const loginSchema = new mongoose.Schema({
    
    email: String,
    password: String,
  });
const Login = mongoose.model('Login', loginSchema);

app.use('/index',express.static('index')); //For serving static files
// app.use(express.urlencoded());

const db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.get('/login',(req,res)=>{
    const params={}
    res.status(200).render('login.html',params);
})

// app.get('/login',(req,res)=>{
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('login.html');
// })

app.post("/login",(req,res)=>{
    var myData = new Login(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
    });

    return res.redirect('login_success.html')

})


app.listen(port,()=>{
    console.log(`The application started successfully on port 9000`);
})
// console.log("Listening on PORT 9000");