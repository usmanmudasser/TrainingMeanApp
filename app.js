const express = require('express');
const  path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const app = express();
const users = require('./routes/users');

//connect to database
mongoose.connect(config.database);

//on connected
mongoose.connection.on('connected',()=>
{
console.log('connected to database ' + config.database);
});

//db connection  error
mongoose.connection.on('error',(err)=>
{
console.log('database error  ' + err);
});

//port server listening at
const port = 3000;

//CORS middleware
app.use(cors());

// set static folder

app.use(express.static(path.join(__dirname,'public')));

// body parser middleware

app.use(bodyParser.json());
 
 //passport middlewarea
 app.use(passport.initialize());
 app.use(passport.session());

require('./config/passport')(passport);

 //route for Registeration of users
 app.use('/users',users);

// index route
app.get('/', (req,res) => {
res.send('Invalid end point');
});

app.get('*',(req,res)=>
{
    res.sendFile(path.join(__dirname,'public/index.html'));
})
//start Server 
app.listen(port, ()=> {
console.log('Server started on port ' + port);
});