const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const { bookSchema } = require('./models/bookModel');

const authenticateToken = require('./middlewares/authMiddleware')
const bookRouter = require('./routes/bookRouter')(bookSchema);
const registerRouter = require('./routes/registerRouter')();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', registerRouter);
app.use(authenticateToken)
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.json({ test: "test" });
});

app.listen(port, () => {
  console.log(`Runing on port ${port}`);
});

