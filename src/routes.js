const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl");
const { createUser, login, getUsers } = require("./controllers/users");
const { isUserAuthenticated } = require("./middlewares/verifyToken");
const { validateBodyRequest } = require("./middlewares/validateBodyRequest");
const { createUserSchema, userLoginSchema } = require("./lib/userSchema");
const { createProject, getProjects } = require("./controllers/projects");
const { createProjectSchema } = require("./lib/projectSchema");

const router = Router();

router.get("/", baseUrl);
router.post("/user", [validateBodyRequest(createUserSchema)], createUser);
router.post("/session", [validateBodyRequest(userLoginSchema)], login);
router.get("/user", getUsers);

router.use(isUserAuthenticated);
router.post(
  "/projects",
  [validateBodyRequest(createProjectSchema)],
  createProject
);
router.get('/projects', getProjects);
module.exports = {
  router,
};
