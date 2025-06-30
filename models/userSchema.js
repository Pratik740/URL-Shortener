const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        name: {
            type:String,
            required:true
        },
        email: {
            type: String,
            required:true,
            unique:true
        },
        password: {
            required:true,
            type:String
        },
        role: {
            type: String,
            required: true,
            default: "NORMAL"
        }
    },
    { timestamps: true }
);

const User = mongoose.model("user",userSchema);

module.exports = User;

