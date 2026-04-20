const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const authHeader = req.cookies.token; 

    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
        next();
    
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};