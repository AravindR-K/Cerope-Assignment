const express = require("express");
const auth = require("../middleware/auth.js");
const { getProfileById, updateProfile } = require("../controllers/profileController.js");

const router = express.Router();

router.get("/myProfile", auth, getProfileById);
router.put("/myProfile", auth, updateProfile);

module.exports = router;
