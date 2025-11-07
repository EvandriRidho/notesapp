const db = require('../config/db.js');
const util = require('util')

const query = util.promisify(db.query).bind(db)

class NotesService {
    async getAll(userId) {
        const sql = 'SELECT * FROM notes WHERE user_id = ? ORDER BY created_at DESC';
        const results = await query(sql, [userId]);
        return results;
    }

    async getById(id, userId) {
        const sql = 'SELECT * FROM notes WHERE id = ? AND user_id = ?';
        const results = await query(sql, [id, userId]);
        if (results.length === 0) throw new Error('Note Not Found');
        return results[0];
    }

    async create(data, userId) {
        const sql = 'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)';
        const result = await query(sql, [data.title, data.content, userId]);
        return { id: result.insertId, ...data, user_id: userId };
    }

    async update(id, data, userId) {
        const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?';
        const result = await query(sql, [data.title, data.content, id, userId]);
        if (result.affectedRows === 0) throw new Error('Note Not Found');
        return { id, ...data };
    }

    async delete(id, userId) {
        const sql = 'DELETE FROM notes WHERE id = ? AND user_id = ?';
        const result = await query(sql, [id, userId]);
        if (result.affectedRows === 0) throw new Error('Note Not Found');
        return true;
    }
}

module.exports = new NotesService();