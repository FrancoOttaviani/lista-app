const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {isAuthenticated} = require('../helpers/auth');


router.get('/notes/add', isAuthenticated, (req, res) => {
    res.render('notes/new-notes')
});

router.post('/notes/new-notes', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    const error = [];
    if(!title){
        error.push({ text: 'Por favor ingrese un titulo'})
    }
    if(!description){
        error.push({ text: 'Por favor ingrese una descripcion'})
    }
    if(error.length > 0){
        res.render('notes/new-notes', {
            error,
            title,
            description
        });
    }
    else{
        const newNote =  new Note ({ title, description});
        newNote.user = req.user.id;
        await newNote.save();
        req.flash('success_msg', 'La nota se agrego correctamente');
        res.redirect('/notes');

    }
})

router.get('/notes', isAuthenticated, async (req, res) => {
    const notes = await Note.find({user: req.user.id}).lean().sort({date: 'desc'});
    res.render('notes/all-notes', {notes});
});

router.get('/notes/edit/:id', isAuthenticated, async (req, res) => {
    const note = await Note.findById(req.params.id).lean();
    
    res.render('notes/edit-note', {note});
});

router.put('/notes/edit-note/:id', isAuthenticated, async (req, res) => {
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description}).lean();
    req.flash('success_msg', 'La Nota se ha editado correctamente.');
    res.redirect('/notes');
});
router.delete('/notes/delete/:id', isAuthenticated, async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'La Nota se ha eliminado correctamente.');
    res.redirect('/notes')
});

module.exports = router;