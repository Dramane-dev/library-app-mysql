const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
     .then(() => {
        res.send({ message: 'User registred successfuly !'});
     })
     .catch(err => {
         return res.status(500).send({ message: err.message });
     });
};

