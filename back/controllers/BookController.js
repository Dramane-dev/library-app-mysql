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
};

exports.updateBook = (req, res) => {
    const id = req.params.id;
    const body = req.body;

    Book.update(body, {
        where: {
            id: id
        }
    })
     .then(book => {
        if (book < 1) {
            return res.status(404).send(error({
                message: 'Cannot upadated book ❌ Verify this id. The value cannot be empty or same !'
            }));
        }

        res.status(200).send({
            message: 'Book updated successfuly ✅ !'
        });
     })
     .catch(err => {
        if (err) {
            return res.status(404).send({
                message: `The book with id ${id} cannot be upadated  ❌ ...`
            });
        }
     });
};


exports.deleteBook = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: {
            id: id
        }
    })
     .then(book => {
        if (book < 1) {
            return res.status(404).send({
                message: 'Cannot deleted task ❌ ! Verify this id. Maybe this task does not exist ?'
            });
        }

        res.status(200).send({
            message: 'Book deleted successfuly ✅ !'
        });
     })
     .catch(err => {
        if (err) {
           return res.status(500).send({
               message: err.message
           });
        }
     });
};