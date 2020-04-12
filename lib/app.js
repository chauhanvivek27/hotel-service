const express = require("express");
var cors = require("cors");
const app = express();
const hotelRoutes = require("../route/index");
const errorHandler = require("../util/error");
app.use(cors());
app.use("/", hotelRoutes);

app.use(errorHandler);

module.exports = app;
