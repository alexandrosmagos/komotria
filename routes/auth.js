const {signup, login} = require("../controllers/userController");

const router = require("express").Router();

router.route("/api/signup").post(signup);
router.route("/api/login").post(login);

module.exports = router;