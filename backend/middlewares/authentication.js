const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');
const user = require('../models/user-model');
module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    if (token) {
        try {
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            req.userLogged = decoded;
            let user2 = await user.findById(req.userLogged.user._id);
            if (!user2) {
                res.status(401).send({ message: 'User doesn´t exists' });
                return;
            }
            next();
        } catch (error) {
            res.status(401).send({ message: 'Invalid token' });
            return;
        }
    } else {
        res.status(401).send({ message: 'You need inform token for access this resource.' });
        return;
    }
}
