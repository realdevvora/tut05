const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body
    if (!user || !password) {
        return res.status(400).json({"message": "Username and password are required"})
    }
    // check for duplicate usernames in DB
    const duplicate = await User.findOne({username: user}).exec()

    if (duplicate) return res.sendStatus(409); //Conflict 
    try {
        // encrypt password
        const hashedPassword = await bcrypt.hash(password, 10)

        // create and store new user
        const result = await User.create({
            "username": user, 
            "password": hashedPassword
        })

        console.log(result)

        res.status(201).json({"success": `New user ${user} created!`})
    } catch (err) {
        return res.status(500).json({"message": err.message})
    }
}

module.exports = {handleNewUser}