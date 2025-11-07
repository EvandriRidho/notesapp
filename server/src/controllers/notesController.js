const notesService = require('../service/notesService.js');

class notesController {
    async getAll(req, res) {
        try {
            const notes = await notesService.getAll(req.user.id);
            res.status(200).json(notes);
        } catch (err) {
            console.error('Error in getAll:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getById(req, res) {
        try {
            const note = await notesService.getById(req.params.id, req.user.id);
            res.status(200).json(note);
        } catch (error) {
            console.error('Error in getById:', err.message);
            res.status(404).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const newNote = await notesService.create(req.body, req.user.id);
            res.status(201).json(newNote);
        } catch (error) {
            console.error('Error in Create:', err.message);
            res.status(400).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const updated = await notesService.update(req.params.id, req.body, req.user.id);
            res.status(200).json(updated);
        } catch (error) {
            console.error('Error in Update:', err.message);
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await notesService.delete(req.params.id, req.user.id);
            res.status(204).end();
        } catch (error) {
            console.error('Error in delete:', err.message);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new notesController();