const User = require("../model/User")

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content, successfull
    const refreshToken = cookies.jwt;

    // is refresh token in DB?
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204);
    } 
    foundUser.refreshToken = ""
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }) // secure: true (for https)
    res.sendStatus(204)
}

module.exports = { handleLogout }