require("dotenv").config();
const express = require("express");
const { router } = require("./routes");
const cors = require('cors')

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}));

app.use(express.json());
app.use(router);

module.exports = {
  app,
};
