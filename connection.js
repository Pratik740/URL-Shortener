const mongoose = require('mongoose')

const connectMongoDb = async (url) =>{
    try{
        await mongoose.connect(url);
        console.log('Database Connection Successful')
    }
    catch(err){
        console.log("Database Connection Unsuccessful",err)
    }
}

module.exports = {
    connectMongoDb
}