const Joi = require('joi'); 

const bookValidationSchema = Joi.object().keys({
    author: Joi.string().required(),
    name: Joi.string().required(),
    img: Joi.string().required(),
    rates: Joi.number().integer().required(),
    price: Joi.number().integer().required(),
    categoryCode: Joi.string().required(),
    publisher: Joi.string().required(),
    descriptionId: Joi.string().required(),
    shopId: Joi.array().items(Joi.string())
})

module.exports = bookValidationSchema;