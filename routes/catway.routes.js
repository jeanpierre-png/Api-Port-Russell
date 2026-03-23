const express = require('express');
const router = express.Router();
const Catway = require('../models/Catway');

const controller = require('../controllers/catway.controller');
const authMiddleware = require('../middlewares/auth.middleware');


/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Récupérer touts les catways
 *     tags: [Catways]
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des catways
 */
router.get('/', authMiddleware, controller.getAll);


/**
* @swagger
* /catways/{id}:
*   get:
*     summary: Récupérer un catway par ID
*     tags: [Catways]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: id
*         required: true
*         description: ID du catway
*         schema:
*           type: string
*     responses:
*       200:
*         description: Catway trouvé
*       404:
*         description: Non trouvé
*/
router.get('/:id', authMiddleware, controller.getOne);


/**
 * @swagger
 * /catways:
 *   post:
 *     summary: Créer une catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Catway créé
 */
router.post('/', authMiddleware, controller.create);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Modifier un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 */
router.patch('/:id', authMiddleware, controller.update);

/**
 * @swagger
 * /catways/{id}:
 *   delete:
 *     summary: Supprimer une catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 */
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