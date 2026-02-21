const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userService = require('../services/user.service')

exports.login = async (req, res) => {
    const { email, password} = req.body;

    const user = await userService.findByEmail(email);
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvée'});
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect'});
    }

    const token = jwt.sign(
        { userId: user._id},
        process.env.JWT_SECRET,
        { expiresIn: '1h'}
    );

    res.json({ token });
};

exports.register = async (req, res) => {
    const { name, email, password } =req.body; 

    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'Utilisateur déjà existant' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
        name,
        email,
        password: hashedPassword
    });

    res.status(201).json({ message: 'Utilisateur créé', user: newUser })
};