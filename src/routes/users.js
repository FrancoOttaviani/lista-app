const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const {name, email, password, passwordConfirm} = req.body;
    const errors = [];
    
    if(name.length <= 0 ){
        errors.push({text: 'Por favor ingrese un nombre'});
    }
    if(password != passwordConfirm){
        errors.push({text: 'Verifique que las contraseñas coincidan'});
    }
    if(password.length < 4){
        errors.push({text: 'La contraseña debe ser mayor a 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, passwordConfirm});
    }
    else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El email ya esta en uso');
            res.redirect('/users/signup');
        }
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Se ha registrado con exito');
        res.redirect('/users/signin');
    }
    
    
});

router.get('/users/logout', (req, res) => {
    req.logOut();
    res.redirect('/home')
});

module.exports = router;