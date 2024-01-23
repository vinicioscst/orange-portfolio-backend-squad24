require("dotenv").config();
const express = require("express");
const { router } = require("./routes");

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

module.exports = {
  app,
};
