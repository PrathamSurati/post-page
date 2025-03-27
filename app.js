const express = require('express');
const app = express();
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', (req,res)=>{
    res.render("index");
});

app.post('/register', async (req,res)=>{
    let {username, email, password, name, age} = req.body;
    let user = await userModel.findOne({email});
    if(user) return res.status(400).send("User already exists"); 

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
           let user = await userModel.create({
                username,
                name,
                age,
                email,
                password : hash
            });
            // console.log(user.password);
        });
        let token = jwt.sign({email : email, userid : user._id}, "pratham");
        res.cookie("token", token);
        res.send("User registered successfully");
    });


});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});