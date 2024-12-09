const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1/sociytey_managment_system");

// const db = mongoose.connection;

// db.once('open', (e)=>{
//     if(e){
//         console.log("db not conncted");
//     }
//     console.log("db conncted");
// });

// module.exports = db;



const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MongoDB_url);
  
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // Exit process with failure
    }
};


module.exports = connectDB;