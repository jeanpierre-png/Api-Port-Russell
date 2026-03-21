const catwayService = require('../services/catway.service');

exports.getAll = async (req, res) => {
    const catways = await catwayService.getAll();
    res.render("catways", {
        catways: catways
    });
};

exports.getOne = async (req, res) => {
    const catway = await catwayService.getOne(req.params.id);
    if (!catway) {
        return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.render("catway", {
        catway: catway
    });
};

exports.create = async (req, res) => {
    await catwayService.create(req.body);
    res.redirect('/dashboard');
};

exports.update = async (req, res) => {
    const updated = await catwayService.update(req.params.id, req.body);
    if (!updated) {
        return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.json(updated);
};

exports.delete = async (req, res) => {
    const deleted = await catwayService.delete(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: "Catway non trouvé" });
    }
    res.json({ message: "Catway supprimé" });
    
};