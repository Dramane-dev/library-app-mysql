const Book = require('../models/book.model');

exports.allAccess = (req, res) => {
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