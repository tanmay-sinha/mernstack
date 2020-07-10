const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    
    if (!token) return res.status(401).json({ msg: 'No token, Unauthorized' });

    try {
        const decode = jwt.verify(token, config.get('jwtsecret'));

        req.user = decode;

        next();
    } catch (error) {
        res.status(400).json({msg: 'Token INvalid'});
    }
}

module.exports = auth;