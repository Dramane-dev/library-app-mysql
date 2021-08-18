const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
     .then(user => {
        if (!user) {
            res.status(404).send({ message: 'User not found !'});
        }

        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            res.status(401).send({
                accessToken: null,
                message: 'Invalid password !'
            });
        }

        let token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: 86400
        });

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        });
     })
     .catch(err => {
         res.status(500).send({ message: err.message });
     });
};