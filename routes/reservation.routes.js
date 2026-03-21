const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

const controller = require('../controllers/reservation.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.getAll);
router.get('/:id',  controller.getOne);
router.post('/', controller.create);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);

router.post('/delete', async (req, res) => {
    await Reservation.findByIdAndDelete(req.body.id);
    res.redirect('/dashboard');
});

module.exports = router;