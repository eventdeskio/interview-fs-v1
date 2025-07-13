const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
    
    res.json({ token });
};

module.exports = authenticateToken;