const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const morgan = require('morgan');
const notesRouter = require('./routes/notesRoute.js');
const authRouter = require('./routes/authRoute.js')

dotenv.config();
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/notes', notesRouter);
app.use('/api/v1/auth', authRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));