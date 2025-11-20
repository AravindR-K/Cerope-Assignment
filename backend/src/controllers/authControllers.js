const User = require("../models/User")
const bcrypt = require("bcryptjs")

registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password ) {
            return res.status(400).json({
                "error": "All fields are required" 
            })
        }

        const IsUserExisisting = await User.findOne({email})
        if (IsUserExisisting){
            return res.status(400).json({
            "error": "Email already registered. Log in" 
            })
        }

        const hashedPass = await bcrypt.hash(password, 10) 

        const user = await User.create({
            name,
            email,
            password: hashedPass
        })

        await user.save()

        return res.status(201).json({
            "status": 200,
            "message": "User registered successfully"
        })
    } catch(error){
        console.log("Error in authController.js: ", error)
        return res.status(500).json({
        "message": "Something Bad Happend.."
        })
    }
}

loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if( !email || !password) {
            return res.status(400).json({
            "message": "Fields missing. Recheck" 
            })
        }

        const user = await User.findOne({email})


        if (!user){
            return res.status(400).json({
            "message": "user not available. go and register" 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
            "message": "Password incorrect" 
            })
        }
        console.log(user)
        return res.status(201).json({
            "message": "User logged in successfully"
        })
    } catch(error){
        console.log("Error in authController.js: ", error)
        return res.status(500).json({
        "message": "Something Bad Happend.."
        })
    }

}
module.exports = {registerUser, loginUser}
