require("dotenv").config();
const express = require("express");
const { router } = require("./routes");
const cors = require('cors')

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  optionSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(router);

module.exports = {
  app,
};
