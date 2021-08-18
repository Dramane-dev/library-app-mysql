const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Book = db.define('book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    title: {
        type: DataTypes.STRING,
        notNull: true
    },
    author: {
        type: DataTypes.STRING,
        notNull: true
    },
    pages: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    bookRead: {
        type: DataTypes.BOOLEAN,
        notNull: true
    }
});

module.exports = Book;