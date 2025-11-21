const express = require("express");
const { registerUser, loginUser , logOutUser} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/logout", logOutUser);

module.exports = router;
