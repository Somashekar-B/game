const { User } = require('../models/associations');

const addUser = async (req, res) => {
    try {
        const username = req.body.firstname;
        const emailid = req.body.email;
        const password = req.body.password;
        const user = User.create({
            username: username,
            email: emailid,
            password: password
        });
        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {

        const userId = req.body.username;
        const password = req.body.password;

        const user = User.findOne({
            where: {
                id: userId
            }
        });
        if (user) {
            const passwordMatch = bcrypt.compare(user.password, password);
            if (passwordMatch) {
                res.status(200).json({ status: 'online', "message": "Login SuccessFul" });
            } else {
                res.status(200).json({ status: 'fail', "message": "UserName or Password Doesn't Match" });
            }
        } else {
            res.status(200).json({ status: 'fail', "message": "UserName or Password Doesn't Match" });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addUser, login };