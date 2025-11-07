const express = require('express');
const notesRouter = express.Router();
const notesController = require('../controllers/notesController');
const authMiddleware = require('../middlewares/authMiddleware.js');

notesRouter.use(authMiddleware);

notesRouter.get('/', notesController.getAll.bind(notesController));
notesRouter.get('/:id', notesController.getById.bind(notesController));
notesRouter.post('/', notesController.create.bind(notesController));
notesRouter.put('/:id', notesController.update.bind(notesController));
notesRouter.delete('/:id', notesController.delete.bind(notesController));

module.exports = notesRouter;