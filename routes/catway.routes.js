const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const controller = require('../controllers/catway.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.post('/', controller.create);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

router.post('/delete', async (req, res) => {
    await Catway.findByIdAndDelete(req.body.id);
    res.redirect('/dashboard');
});

router.post('/update', async (req, res) => {

    const { id, catwayState } = req.body;
    
    await Catway.findByIdAndUpdate(id, {
        catwayState: catwayState
    });
    
    res.redirect('/dashboard');
});

module.exports = router;