const jwt = require('jsonwebtoken')
const SECRET = "Please_Don't_Get_Disclosed" 

function setUser (user){
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload,SECRET);
}
// We haven't passed whole user object cauze user object (created by mongoose) contains
// much irrelevant data that will just increase size of token. 

function getUser(token){
    try{
        const decoded = jwt.verify(token,SECRET);
        return decoded; // If valid returns the payload.
    }
    catch(err){
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}

// What JWT.Sign() Does:
// 1.Creates Header: Algorithm and token type
// 2.Encodes Payload: Your data (base64 encoded)
// 3.Signs Token: Uses secret to create signature
// 4.Returns String: Complete JWT token