const { generateAccessToken } = require("./accessToken")


exports.ensureUserLogin = async (user, res) => {
    try {
        let payload = null
        if (user.identity === "subAdmin") {
            payload = {
                _id: user._id,
                identity: user.identity,
                name: user.name,
                email: user.email,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        } else {
            payload = {
                _id: user._id,
                identity: user.identity,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                city: user.city,
                country: user.country,
                banner: user.banner,
                tableTitles: user.tableTitles,
                isActive: user.isActive,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
        const token = await generateAccessToken(payload)

        // res.cookie('token', token, {
        //     maxAge: 60 * 60 * 1000,
        //     httpOnly: true,
        //     secure: (CONSTANTS.app.isLocal ? false : true)
        // })
        return token
    } catch (error) {
        console.log(`Ensure Login user exception : `, error.message)
        return false
    }
}