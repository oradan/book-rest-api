const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        author: { type: String },
        name: { type: String },
        img: { type: String },
        rates: { type: Number },
        price: { type: Number },
        categoryCode: { type: String },
        publisher: { type: String },
        descriptionId: { type: String },
        shopId: { type: [String] }
    },
    { versionKey: 'document_version' }
)

const bookModel = mongoose.model('books', bookSchema)

//module.exports = mongoose.model('rest-api-books', bookModel, 'books')
module.exports = { bookModel, bookSchema }