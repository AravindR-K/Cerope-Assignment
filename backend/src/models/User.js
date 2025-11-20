const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

        firstName: {
        type: String,
        default: ""
    },

    lastName: {
        type: String,
        default: ""
    },

    profilePicture: {
        type: String,  // URL or Base64
        default: ""
    },

    dob: {
        type: Date,
        default: null
    },

    stylePreference: {
        type: String,  
        enum: ["men", "women", "both", ""],
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    country: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        default: ""
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);