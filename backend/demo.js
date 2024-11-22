const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = 'your_access_token_secret';
const REFRESH_SECRET_KEY = 'your_refresh_token_secret';
const refreshTokens = [];

// Mock user data
const users = [
    { id: 1, email: 'user@example.com', password: 'password', role: 'user' },
];

// Generate Access Token
const generateAccessToken = (user) => {
    return jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '15m' });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
    const refreshToken = jwt.sign({ email: user.email, role: user.role }, REFRESH_SECRET_KEY);
    refreshTokens.push(refreshToken);
    return refreshToken;
};

// Login Route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) return res.status(401).send('Invalid credentials');

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.json({ accessToken, refreshToken });
});

// Refresh Token Route
app.post('/api/refresh-token', (req, res) => {
    const { token } = req.body;

    if (!token || !refreshTokens.includes(token)) return res.status(403).send('Refresh token not found');

    try {
        const user = jwt.verify(token, REFRESH_SECRET_KEY);
        const accessToken = generateAccessToken(user);
        res.json({ accessToken });
    } catch (err) {
        res.status(403).send('Invalid refresh token');
    }
});

// Protected Route
app.get('/api/dashboard', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).send('Access token required');

    try {
        const user = jwt.verify(token, SECRET_KEY);
        res.json({ message: 'Welcome to the dashboard', user });
    } catch (err) {
        res.status(403).send('Invalid token');
    }
});

const PORT = 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
