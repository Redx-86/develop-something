const express = require('express');
const Anime = require('../../../models/Anime');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newAnime = new Anime(req.body);
        await newAnime.save();
        res.status(201).json(newAnime);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const animes = await Anime.find();
        res.json(animes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;