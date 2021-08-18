const Book = require('../models/book.model');

exports.accessToAllBooks = (req, res) => {
    Book.findAll()
     .then(book => {
        res.status(200).send({
            message: 'Access to all Books ✅ !',
            data: book
        });
     })
     .catch(err => {
         return res.status(404).send({
             message: 'No book in database ...'
         });
     });
};

exports.createBook = (req, res) => {
    const body = req.body;
    
    if (body.title === '' || body.author === '' || body.pages === '') {
        res.status(400).send({
            message: 'All field\'s required !'
        });
    }

    const book = new Book({
        title: body.title,
        author: body.author,
        pages: body.pages,
        bookRead: body.read
    });

    book.save()
     .then(() => {
         res.status(200).send({
             data: book,
             message: 'Book created successfuly ✅ !'
         });
     })
     .catch(err => res.status(500).send({ message: err.message }));
}