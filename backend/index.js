const express = require('express');
const {ConnectToDB} = require('./database/db')
const rootRouter = require('./routes/index')
const app = express();
const bodyparser = require('body-parser')
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use("/api",rootRouter);
ConnectToDB();


app.listen(8080,()=>console.log('listening on port 8080'));