const UserController = require('../controllers/UserController');
const verifyToken = require('../middlewares/authentication');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/books', [verifyToken.verifyToken], UserController.allAccess);
}







