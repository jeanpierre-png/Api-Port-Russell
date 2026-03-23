const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

const controller = require('../controllers/reservation.controller');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get('/', controller.getAll);

/**
* @swagger
* /reservations/{id}:
*   get:
*     summary: Récupérer une réservation par ID
*     tags: [Reservations]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID de la réservation
*         schema:
*           type: string
*     responses:
*       200:
*         description: Réservation trouvée
*       404:
*         description: Non trouvée
*/
router.get('/:id', authMiddleware, controller.getOne);


/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.post('/', controller.create);


/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.patch('/:id', controller.update);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 */
router.delete('/:id', authMiddleware, controller.delete);


router.post('/delete', async (req, res) => {
    await Reservation.findByIdAndDelete(req.body.id);
    res.redirect('/dashboard');
});

module.exports = router;