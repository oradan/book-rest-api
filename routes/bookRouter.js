const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');
const bookValidationSchema = require('../schemas/booksValidationSchema');
const bookValidationMiddware = require('../middlewares/bookMiddleware')

function bookRoutes(bookSchema) {
  const bookRouter = express.Router();
  const dbURL = `mongodb+srv://oradan:ZjSks4bqp75MG02K@productsor.6boiltz.mongodb.net/rest-api-books?retryWrites=true&w=majority`;
  bookRouter.route('/books')
    .post(async (req, res) => {
      let dbCon;
      const validationResult = bookValidationSchema.validate(req.body);
      const { value, error } = validationResult;
      if (Boolean(error)) {
        return res.status(422).json({ message: "Invalid request", data: error },)
      }
      try {
        dbCon = await mongoose.createConnection(dbURL).asPromise();
        const db = dbCon.model('books', bookSchema);
        const book = new db(req.body);
        const newB = await book.save();
        res.status(201).json(newB);
      } catch (error) {
        res.status(400).json(error);
      };
      if (dbCon) {
        dbCon.close();
      }
    })
    .get(async (req, res) => {
      const { query } = req;
      let dbCon;
      try {
        dbCon = await mongoose.createConnection(dbURL).asPromise();
        const db = dbCon.model('books', bookSchema);
        const books = await db.find(query)
        res.json(books);
      } catch (error) {
        res.json(error);
      };
      if (dbCon) {
        dbCon.close();
      }
    })

  // bookRouter.route('/books/:bookId')
  bookRouter.get('/books/:bookId', [(req, res, next) => {
    if (req.params.bookId == 0) {
      return next('route')
    };
    next();
  }, async (req, res) => {
    const bookId = req.params.bookId;
    let dbCon;
    try {
      dbCon = await mongoose.createConnection(dbURL).asPromise();
      const db = dbCon.model('books', bookSchema);
      const book = await db.findById(bookId)
      res.json(book);
    } catch (error) {
      res.json(error);
    }
    if (dbCon) {
      dbCon.close();
    }
  }])


  bookRouter.get('/books/:bookId', (req, res) => {
    res.json({ test: "special" })
  })


  bookRouter.put('/books/:bookId', bookValidationMiddware ,
    async (req, res) => {
      let dbCon;
      const bookId = req.params.bookId;
      try {
        dbCon = await mongoose.createConnection(dbURL).asPromise();
        const db = dbCon.model('books', bookSchema);
        const { id, ...book } = req.body;
        const updatedBook = await db.findByIdAndUpdate(bookId, book, { returnDocument: 'after' })
        res.json(updatedBook);
      } catch (error) {
        res.json(error);
      }
      if (dbCon) {
        dbCon.close();
      }
    })

  return bookRouter;
}

module.exports = bookRoutes;
