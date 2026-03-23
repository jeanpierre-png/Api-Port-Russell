const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/update', async (req, res) => {
    await User.findByIdAndUpdate(req.body.id, {
        name: req.body.name,
        email: req.body.email
    });

    res.redirect('/dashboard');
});

router.post('/delete',  async (req, res) => {
    await User.findByIdAndDelete(req.body.id);

    res.redirect('/dashboard');
});

module.exports = router;