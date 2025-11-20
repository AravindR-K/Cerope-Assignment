const jwt = require("jsonwebtoken");
const User = require("../models/User");

cookieJwtAuth = async  (req, res, next) => {
    const token = req.cookies.token;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ status: "failed", message: "User does not exist" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token")
        res.status(400).json({
            "status": "failed",
            "message": "token invalid.."
        })
    }

}

module.exports = cookieJwtAuth;
