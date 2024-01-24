const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")
const { createUser } = require("./controllers/users")

const router = Router();

router.get("/", baseUrl)
router.post("/user", createUser )

module.exports = {
    router,
};