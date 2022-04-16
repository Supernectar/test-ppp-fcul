const jwt = require('jsonwebtoken')
const User = require('../models/User')

getAllUsers = async (req, res) => {
    try {
        let users = await User.find();
        res.json(users)
    }
    catch (err) {
        res.json(err);
    }
}

insertUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        let user = await User.create({ username: username, password: password });

        res.json(user);
    }
    catch (err) {
        res.json(err);
    }
}

getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let user = await User.findOne({ _id: id });
        res.json(user)
    }
    catch (err) {
        res.json(err);
    }
}

updateUser = async (req, res) => {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1]
            decoded =jwt.decode(token, 'secretkey');
            
            const { id } = req.params;
            const { username, name } = req.body;
    
            if (id != decoded.user._id) {
                res.json({ error: 'You must be the owner to change this profile' });
            }
            else {
                let user = await User.updateMany({ username: id }, { username: username, name: name });
                res.json(user);
            }
        } catch (err) {
            res.json(err);
        }
}

deleteUser = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        decoded =jwt.decode(token, 'secretkey');

        const { id } = req.params;
        if (id != decoded.user._id) {
            res.json({ error: 'You must be the owner to change this profile' });
        }
        else {
            let user = await User.deleteMany({ _id: id });
            res.json(user);
        }
    } catch (err) {
        res.json(err);
    }
}

getUserStorage = async (req, res) => {
    try {
        const { id } = req.params;

        let storages = (await Storage.find()).filter((storage) => storage.visibility == 'public' || storage.owner == id);

        res.json(storages);
    } catch (err) {
        res.json(err)
    }

}

module.exports.getAllUsers = getAllUsers;
module.exports.insertUser = insertUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserStorage = getUserStorage;