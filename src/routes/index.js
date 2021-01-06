const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');

router.get('/verNotas', async (req, res) => {
    const notes = await Note.find().lean();
    const user = await User.find().lean();
    res.render('verNotas', {notes, user});
});

router.get('/', (req, res) => {
    res.render('home')
});
router.get('/home', (req, res) => {
    res.render('home')
});

module.exports = router;