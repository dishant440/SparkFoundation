const express = require('express')
const Router = express.router();
const AccountRouter = require('./Account');
const CustomerRouter = require('./Customer');


Router.use("/user",CustomerRouter);
Router.use("/transer",TranserRouter);