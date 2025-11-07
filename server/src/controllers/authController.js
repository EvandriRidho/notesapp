const authService = require('../service/authService.js')

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            if (!username || !password) {
                res.status(400).json({ message: 'Username and Password are required' });
            }

            const user = await authService.register({ username, email, password });
            res.status(201).json({ message: 'User Registed Successfully', user });
        } catch (error) {
            console.error('Error in Register:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                res.status(400).json({ message: 'Username and Password are required' });
            }

            const result = await authService.login({ username, password });
            res.status(200).json({ message: 'Login Successfully', token: result.token })
        } catch (error) {
            console.error('Error in Login:', err.message);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new AuthController();