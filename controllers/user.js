const express = require('express')
const {v4: uuidv4} = require('uuid');
const User = require('../models/userSchema')
const {getUser,setUser} = require('../services/auth')

async function handleUserSignup (req,res) {
    const body = req.body;
    try{
        const result = await User.create({
            name: body.name,
            email: body.email,
            password: body.password
        });
        return res.status(201).redirect('/homepage');
    } 
    catch(err){
        console.log("Some error occurred",err);
        return res.status(500).redirect('/signup?error=signup_failed');
    }    
}

async function handleUserLogin (req,res){
    try {
        const body = req.body;
        const result = await User.findOne({email : body.email , password : body.password});
        if(!result){
            console.log("Email or Password didn't matched.");
            return res.status(401).redirect('/login?error=invalid_credentials');
        }
        
        const token = setUser(result);
        res.cookie("uid",token);  
        return res.status(200).redirect('/homepage');
    } catch(err) {
        console.log("Login error:", err);
        return res.status(500).redirect('/login?error=server_error');
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}