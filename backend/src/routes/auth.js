const express = require("express")
const router = express.Router()

router.post("/signup", (req, res) => {
    console.log('REGISTER body:', req.body);
    res.status(200).json({
        message : 'register endpoint hit'
    })
})

router.post("/signin", (req, res) => {
    console.log("Login body :", req.body);
    res.status(200).json({
        message : 'login Endpoint hit'
    })
})

module.exports = router