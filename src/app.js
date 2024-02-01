require("dotenv").config();
const express = require("express");
const { router } = require("./routes");
const cors = require('cors')

const app = express();

app.use(cors({
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 200,
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use(express.json());
app.use(router);

module.exports = {
  app,
};
