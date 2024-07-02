const express = require('express');
const {ConnectToDB} = require('./database/db')
const rootRouter = require('./routes/index')
const app = express();
const cors = require('cors')

const mongoDBUri = process.env.DATABASE_URL;
console.log(mongoDBUri);


app.use(cors());
app.use(express.json());
app.use("/api",rootRouter);
ConnectToDB(mongoDBUri);


app.listen(8080,()=>console.log('listening on port 8080'));