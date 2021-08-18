const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');
const verifySignUp = require('../middlewares/verifySignUp');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        '/api/auth/signup',
        verifySignUp.checkDuplicateNameOrEmail,
        RegisterController.signup
    );

    app.post('/api/auth/signin', LoginController.signin);
}