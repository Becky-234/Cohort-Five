const express = require('express');
const router = express.Router();
const RegisterModels = require('../models/formModels');

router.get('/', (req, res) => {
    res.render('form');
});

router.post('/', async (req, res) => {
    try {
        console.log('Form data received:', req.body);

        const newStudent = new RegisterModels({
            fname: req.body.fname,
            lname: req.body.lname,
            course: req.body.course,
            entry: req.body.entry,
            intake: req.body.intake,
            sponsorship: req.body.sponsorship,
            gender: req.body.gender,
            dob: req.body.dob,
            residence: req.body.residence
        });

        await newStudent.save();
        console.log('Student saved to MongoDB');
        res.redirect('/');

    } catch (error) {
        console.error('Error:', error);
        res.redirect('/');
    }
});

module.exports = router;