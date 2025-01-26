var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');
const User = require('../models/users');
const checkBody = require('../modules/checkBody');

//route chargée d’inscrire un utilisateur dans la collection Users.
router.post('/signup', (req, res) => {
    if (!checkBody(req.body, ['name', 'email', 'password'])){
        console.log("Empty")
        res.json({ result: false, error: 'Missing or empty fields' });
        return
    }

    User.findOne({email: req.body.email}).then(data => {
        if (data) {
            res.json({result: false, error: 'User already exists'});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save().then(() => {
                User.find().then(data => {
                    res.json({ result: true });
                })
            });
        }
    })	
});
//Route chargée de vérifier la connexion d’un utilisateur
router.post('/signin', (req, res) => {
    if (!checkBody(req.body, ['email', 'password'])){
        res.json({ result: false, error: 'Missing or empty fields' });
        return
    }
    User.findOne({email: req.body.email, password: req.body.password}).then(data => {
        if (!data) {
            res.json({result: false, error: 'User not found'});
        } else {
            res.json({ result: true });
        }
    })	
});


module.exports = router;