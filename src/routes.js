const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl")
const { createUser, login, getUsers } = require("./controllers/users");
const { isUserAuthenticated } = require("./middlewares/verifyToken");
const { validateBodyRequest } = require("./middlewares/validateBodyRequest");
const { createUserSchema, userLoginSchema } = require("./lib/userSchema");

const router = Router();

router.get("/", baseUrl)
router.post("/user", [validateBodyRequest(createUserSchema)], createUser)
router.post("/session", [validateBodyRequest(userLoginSchema)], login)

router.use(isUserAuthenticated)
router.get("/user", getUsers)
module.exports = {
    router,
};