const express = require('express');
const dotenv = require('dotenv');
const notesRouter = require('./routes/notesRoute.js');
const db = require('./config/db.js');
const morgan = require('morgan');

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/v1/notes', notesRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));