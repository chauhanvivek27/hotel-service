const express = require("express");

const app = require("./app");

console.log(process.env.PORT);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`experss node server start on ${port}`);
});
