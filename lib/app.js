const express = require("express");
var cors = require("cors");
const app = express();
const hotelRoutes = require("../route/index");
const errorHandler = require("../util/error");
app.use(cors()); //add to access this API on localhost from Rect UI

/*
   This function is used to handle the query parameter case insensitive 
    @param request object
    @param response object
    @param next middleware 
*/
app.use((req, res, next) => {
  req.query = new Proxy(req.query, {
    get: (target, name) =>
      target[
        Object.keys(target).find(
          (key) => key.toLowerCase() === name.toLowerCase()
        )
      ],
  });

  next();
});
app.use("/", hotelRoutes);

app.use(errorHandler);

module.exports = app;
