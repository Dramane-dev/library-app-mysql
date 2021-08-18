const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send({
            message: 'Not token provided ❌ !'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unhauthorized ❌ !'
            });
        }

        req.userId = decoded.id;
        next();
    });
};

const authenticationJwt = {
    verifyToken: verifyToken
};

module.exports = authenticationJwt;