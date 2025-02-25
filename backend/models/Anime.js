const mongoose = require('mongoose');

const MyAnimeListSchema = new mongoose.Schema({
    AnimeName: { type: String, required: true },
    AnimeCategory: { type: String, required: true },
    AnimeDescription: { type: String, required: true },
    AnimeImage: { type: String, required: true },
    AnimeCreator: { type: String, required: true },
    AnimeStudio: { type: String, required: true },
    AnimeYear: { type: Date, required: true },
    AnimeChapters: { type: String, required: true }
});
module.exports = mongoose.model('Anime', MyAnimeListSchema);
