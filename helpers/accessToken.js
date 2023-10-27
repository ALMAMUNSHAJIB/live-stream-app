const jwt = require("jsonwebtoken")


/*
JWT Access Token Generator
*/
exports.generateAccessToken = async (payload, expireIn = "1h") => {
    try {
        const token = jwt.sign({
            data: payload
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expireIn });
        return token
    } catch (error) {
        console.log(`An exception occured during generating or saving access token : ${error.message}`)
        return null
    }
}