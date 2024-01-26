const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")
const { createUser, login } = require("./controllers/users");
const { isUserAuthenticated } = require("./middlewares/verifyToken");
const { validateBodyRequest } = require("./middlewares/validateBodyRequest");
const { createUserSchema } = require("./lib/userSchema");

const router = Router();

router.get("/", baseUrl)
router.post("/user", [validateBodyRequest(createUserSchema)], createUser)
router.post("/session", login)

router.use(isUserAuthenticated)

module.exports = {
    router,
};