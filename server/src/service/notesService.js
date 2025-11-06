const db = require('../config/db.js');
const util = require('util')

const query = util.promisify(db.query).bind(db)

class NotesService {
    async getAll() {
        const sql = 'SELECT * FROM notes ORDER BY created_at DESC';
        const results = await query(sql);
        return results;
    }

    async getById(id) {
        const sql = 'SELECT * FROM notes WHERE id = ?';
        const results = await query(sql, [id]);
        if (results.length === 0) throw new Error('Note Not Found');
        return results[0];
    }

    async create(data) {
        const sql = 'INSERT INTO notes (title, content) VALUES (?, ?)';
        const result = await query(sql, [data.title, data.content]);
        return { id: result.insertId, ...data }
    }

    async update(id, data) {
        const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ?';
        const result = await query(sql, [data.title, data.content, id]);
        if (result.affectedRows === 0) throw new Error('Note Not Found')
        return { id, ...data }
    }

    async delete(id) {
        const sql = 'DELETE FROM notes WHERE id = ?';
        const result = await query(sql, [id])
        if (result.affectedRows === 0) throw new Error('Note Not Found')
        return true;
    }
}

module.exports = new NotesService();