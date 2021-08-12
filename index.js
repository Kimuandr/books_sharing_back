require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db');
const userRouter = require('./routes/user.routes');
const bookRouter = require('./routes/book.routes');
const User = require('./db/user');
const Book = require('./db/book');

const PORT = 8080 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use('/api', userRouter);
app.use('/api', bookRouter);

app.listen(PORT, () => console.log(`Port ${PORT}`));

