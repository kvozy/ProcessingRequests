const express = require('express');
const cors = require('cors')
const router = require('./routes/index');
const connection = require('./db');
require('dotenv').config()


const port = 3000;

const app = express();

app.use(express.json());
app.use(cors())

app.use('/api', router)
const start = async () =>{
  try{
    await connection.connect()
    app.listen(port, () => console.log(`server started on ${port}`))
  } catch(e){
    console.log(e)
  }
}

start()


