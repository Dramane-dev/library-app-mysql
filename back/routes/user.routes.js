const BookController = require('../controllers/BookController');
const verifyToken = require('../middlewares/authentication');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/books', [verifyToken.verifyToken], BookController.accessToAllBooks);

    app.get('/book/:id', [verifyToken.verifyToken], BookController.getBookById);

    app.post('/book', [verifyToken.verifyToken], BookController.createBook);
    
    app.put('/book/:id', [verifyToken.verifyToken], BookController.updateBook);

    app.delete('/book/:id', [verifyToken.verifyToken], BookController.deleteBook);
}