const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log("Middleware appelé");

    const authHeader = req.cookies.token; 

    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' });
    }

    console.log("Cookies:", req.cookies);

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SECRET_KEY');
        next();
    
    } catch (error) {
        console.log("Erreur JWT", error.message);
        res.status(401).json({ message: 'Token invalide' });
    }
};