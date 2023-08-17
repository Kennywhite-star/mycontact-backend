const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");



router.post("/register", registerUser );

router.post("/login", loginUser);

//private...we re going to check out the token

router.get("/current", validateToken, currentUser);


module.exports = router;