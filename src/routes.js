const { Router } = require("express");
const { baseUrl } = require("./controllers/baseUrl");
const {
  createUser,
  login,
  getUsers,
  googleLogin,
} = require("./controllers/users");
const { isUserAuthenticated } = require("./middlewares/verifyToken");
const { validateBodyRequest } = require("./middlewares/validateBodyRequest");
const { createUserSchema, userLoginSchema } = require("./lib/userSchema");
const {
  createProject,
  getProjects,
  getUserProject,
} = require("./controllers/projects");
const { createProjectSchema } = require("./lib/projectSchema");
const multer = require("./lib/multer");
const { uploadImages, getUploadImages } = require("./controllers/upload");

const router = Router();

router.get("/", baseUrl);
router.post("/user", [validateBodyRequest(createUserSchema)], createUser);
router.post("/session", [validateBodyRequest(userLoginSchema)], login);
router.post("/session/google", googleLogin);
router.get("/user", getUsers);
router.post("/projects/upload", [multer.single("file")], uploadImages);
router.get("/projects/upload", getUploadImages);

router.use(isUserAuthenticated);
router.post(
  "/projects",
  [validateBodyRequest(createProjectSchema)],
  createProject
);
router.get("/projects", getProjects);
router.get("/projects/user", getUserProject);

module.exports = {
  router,
};
