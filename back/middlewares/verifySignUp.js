const User = require('../models/user.model');

checkDuplicateNameOrEmail = (req, res, next) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    })
     .then(user => {
         if (user) {
             res.status(400).send({
                 message: 'The name is already used !'
             });
             return;
         }

         User.findOne({
             where: {
                 email: req.body.email
             }
         })
          .then(user => {
              if (user) {
                  res.status(400).send({
                      message: 'The email is already used !'
                  });
                  return;
              }

              next();
          });
     });
}

const verifySignUp = {
    checkDuplicateNameOrEmail: checkDuplicateNameOrEmail
}

module.exports = verifySignUp;