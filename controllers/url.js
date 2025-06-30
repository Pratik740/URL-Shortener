const URL = require('../models/urlSchema');
const shortid = require('shortid')

// res.render(view, locals, callback)
// view: name(file) , locals : data to pass (optional , type object) , callback (optional)


async function handleGenerateNewShortUrl(req,res){
    const body = req.body;    
    if(!body.url){
        return res.status(400).json({error:"url is required..."})
    }
    try{
        // Check if this specific user already has a short URL for this redirect URL
        let result = await URL.findOne({redirectUrl:body.url , createdBy: req.user._id});
        if(result) console.log("url already exists for that user.");
        if(!result)
        {   
            result = await URL.create({
                shortId: shortid.generate(),
                redirectUrl: body.url,
                visitHistory: [],
                createdBy: req.user._id                

            });
        }
        const allUrls = await URL.find({createdBy: req.user._id});
        return res.status(201).render("../views/home", {id: result.shortId, port:8000,urls:allUrls});
    }
    catch(err){
        console.log(`Some error occurred`,err);
        return res.status(500).json({error: "Internal server error"});
    }
}

async function handleResolveShortUrl(req,res){
    const chotaId = req.params.shortid;
    console.log('Hello');
    if(!chotaId){
        return res.status(400).json({error: `ShortId not found`})
    }
    try{
        console.log(chotaId)
        const result = await URL.findOneAndUpdate(
            { shortId: chotaId } ,
            { $push: { visitHistory: { timestamp: Date.now()} } } ,
            { new: true }
        );
                
        if(!result){
            return res.status(404).json({ error: "Short URL not found" });
        }
        console.log(`Redirected to https://${result.redirectUrl}`);
        return res.redirect('https://'+ result.redirectUrl);    
    }
    catch(err){
        console.log("Error occurred",err);
        return res.status(500).json({error: "Internal server error"});
    }
}

async function handleGetAnalytics(req,res){
    const shortId = req.params.shortid;
    if(!shortId){
        return res.status(400).json({error: `ShortId not found`});
    }   
    const result = await URL.findOne({shortId});
    if(!result){
        return res.status(404).json({ error: "Short URL ot found" });
    }
    return res.json({
        totalClicks: result.visitHistory.length,
        BaseUrl: result.redirectUrl,
        analytics: result.visitHistory 
    });

}

module.exports = {
    handleGenerateNewShortUrl,
    handleResolveShortUrl,
    handleGetAnalytics
}   