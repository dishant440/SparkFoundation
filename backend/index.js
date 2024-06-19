const express = require('express');
const {ConnectToDB} = require('./database/db')
const rootRouter = require('./routes/index')
const app = express();

app.use("/api",rootRouter);
ConnectToDB();


app.listen(8080,()=>console.log('listening on port 8080'));