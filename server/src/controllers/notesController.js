const notesService = require('../service/notesService.js');

class notesController {
    async getAll(req, res) {
        try {
            const notes = await notesService.getAll();
            res.status(200).json(notes);
        } catch (err) {
            console.error('Error in getAll:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const note = await notesService.getById(id);
            res.status(200).json(note);
        } catch (error) {
            console.error('Error in getById:', err.message);
            res.status(404).json({ message: error.message });
        }
    }

    async create(req, res) {
        try {
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content required' });
            }
            const newNote = await notesService.create({ title, content });
            res.status(201).json(newNote);
        } catch (error) {
            console.error('Error in getById:', err.message);
            res.status(400).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { title, content } = req.body;
            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content required' });
            }
            const updated = await notesService.update(id, { title, content });
            res.status(200).json(updated);
        } catch (error) {
            console.error('Error in delete:', err.message);
            res.status(400).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id)
            await notesService.delete(id);
            res.status(204).end();
        } catch (error) {
            console.error('Error in delete:', err.message);
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new notesController();