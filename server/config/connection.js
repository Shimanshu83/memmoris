require('dotenv').config() ; 
const mongoose = require("mongoose");


async function connectDB() {
  console.log(process.env.MONGO_CONNECTION_URL)
  mongoose.connect(
    process.env.MONGO_CONNECTION_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  const connect = mongoose.connection;

  
  //return promises
  
  try{
  await connect.once("open", () => {
      console.log("database connected");
    })
  }
  catch(err) {
    console.log(err)
  }
  
    
    
}

module.exports = connectDB;