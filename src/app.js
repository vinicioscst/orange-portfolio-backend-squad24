require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./services/swagger.json")
const { router } = require("./routes");
const cors = require("cors");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    allowedHeaders: "Accept,Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(router);

module.exports = {
  app,
};
