const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db.js');
const util = require('util');

const query = util.promisify(db.query).bind(db);

class AuthService {
    async register({ username, email, password }) {
        const isUserExist = await query('SELECT * FROM users WHERE username = ?', [username]);

        if (isUserExist.length > 0) throw new Error('Username already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = 'INSERT INTO users (username, email,password) VALUES (?,?,?)';
        const result = await query(sql, [username, email, hashedPassword]);
        return { id: result.insertId, username, email };
    }

    async login({ username, password }) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        const result = await query(sql, [username])

        if (result.length === 0) throw new Error('User Not Found');

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid Password');

        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
        )

        return { token }
    }
}

module.exports = new AuthService();