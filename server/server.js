
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./.env" });
const Routes = require("./routers/userRouter");

mongoose
  .connect(process.env.CONN_STR, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
   
    console.log("Successfully connected");
  });


  
app.use(cors());
app.use(express.json());
app.use("/users", Routes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT}`);
});


  // const crypto = require('crypto');


  // const generateJwtSecret = () => {
  //   return crypto.randomBytes(64).toString('hex');
  // };
  
  // console.log(generateJwtSecret());