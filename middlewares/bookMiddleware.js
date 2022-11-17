const bookValidationSchema = require('../schemas/booksValidationSchema')

 module.exports = function bookSchemaValidation(req, res, next) {
    const validationResult = bookValidationSchema.validate(req.body);
    const { value, error } = validationResult;
    if (Boolean(error)) {
      return res.status(422).json({ message: "Invalid request", data: error },)
    }
    next()
  }