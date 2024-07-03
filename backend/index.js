const express = require('express');
const { ConnectToDB } = require('./database/db');
const rootRouter = require('./routes/index');    
const app = express();
const cors = require('cors');
require('dotenv').config(); 
const mongoDBUri = process.env.DATABASE_URL;
const port = 8080;


app.use(cors());
app.use(express.json());
app.use("/api", rootRouter);
console.log(mongoDBUri);
ConnectToDB(mongoDBUri);

app.listen(port, () => console.log(`Listening on port ${port}`));
