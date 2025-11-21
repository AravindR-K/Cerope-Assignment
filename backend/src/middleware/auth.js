const jwt = require("jsonwebtoken");
const User = require("../models/User");

const cookieJwtAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            status: "failed",
            message: "No token found. Please login again."
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            res.clearCookie("token");
            return res.status(401).json({
                status: "failed",
                message: "User does not exist"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        res.clearCookie("token");
        return res.status(401).json({
            status: "failed",
            message: "Token invalid. Login again."
        });
    }
};

module.exports = cookieJwtAuth;
