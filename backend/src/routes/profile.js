const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth.js")
const {getProfileById, updateProfile} = require("../controllers/profileController.js")

router.get('/myProfile',  auth, getProfileById);

router.put('/myProfile',auth,  updateProfile);

module.exports = router 