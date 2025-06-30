const express = require('express')
const router = express.Router();
const URL = require('../models/urlSchema')
const User = require('../models/userSchema')
const {checkForAuthentication, restrictTo} = require('../middlewares/auth')

router.get("/admin/urls",checkForAuthentication,restrictTo(["ADMIN"]),async (req,res)=>{
    const allUrls = await URL.find({});
        return res.render("../views/home",{
        urls: allUrls,
        id: null,
        admin: true,
    });
});

router.get("/homepage",checkForAuthentication,restrictTo(["NORMAL","ADMIN"]), async (req,res)=>{
    const allUrls = await URL.find({createdBy: req.user._id});
    return res.render("../views/home", {id: null , urls: allUrls,admin:false});
});

router.get("/signup",async function (req,res){
    return res.status(200).render('../views/signup'); 
});

router.get("/login",async function(req,res){
    return res.status(200).render('../views/login');
});

module.exports = router;