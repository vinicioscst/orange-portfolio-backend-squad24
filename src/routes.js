const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")

const router = Router();

router.get("/", baseUrl)

module.exports = {
    router,
};