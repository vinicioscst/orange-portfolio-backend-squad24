const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")
const { createUser, login } = require("./controllers/users")

const router = Router();

router.get("/", baseUrl)
router.post("/user", createUser)
router.post("/session", login)

module.exports = {
    router,
};