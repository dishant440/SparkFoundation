const express = require('express')
const Router = express.Router();
const CustomerRouter = require('./Customer');


Router.use("/user",CustomerRouter);

module.exports = Router;