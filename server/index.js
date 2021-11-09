const express = require('express');
const cors = require('cors');

const postRoute = require("./routes/posts"); 

const app = express();

app.use(cors());
app.use(express.json({limit : "30mb", extended : true}));
app.use(express.urlencoded({limit : "30mb", extended : true}));

// connecting database 
const connectDB = require('./config/connection'); 
connectDB() ; 

app.use('/posts' , postRoute); 
app.use('/' , (req , res ,next) => {
    return res.send({success: true});
})


app.listen(5000); 