const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")
const { createUser, login, teste } = require("./controllers/users");
const { isUserAuthenticated } = require("./middlewares/verifyToken");

const router = Router();

router.get("/", baseUrl)
router.post("/user", createUser)
router.post("/session", login)

router.use(isUserAuthenticated)

module.exports = {
    router,
};