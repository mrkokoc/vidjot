const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Load Idea Model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Idea Index Page
router.get('/', (req, res) => {
    Idea.find({})
            .sort({date: 'desc'})
            .then(ideas => {
                res.render('ideas/index', {
                    ideas: ideas
                });
            });
});

// Add Idea Form
router.get('/add', (req, res) => {
    res.render('ideas/add')
});

// Edit Idea Route
router.get('/edit/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        res.render('ideas/edit', {
            idea: idea
        });
    });
});

// Form Process
router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.title) {
        errors.push({
            text: 'Please add title'
        });
    }
    if (!req.body.details) {
        errors.push({
            text: 'Please add some details'
        });
    }
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details
        });
    } else {
        const newUser = {
            title: req.body.title,
            details: req.body.details,
        };
        new Idea(newUser).save().then(idea => {
            req.flash('success_msg', 'Idea added');
            res.redirect('/ideas')
        })
    }
});

// Edit Form Process
router.put('/:id', (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        // new values
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save().then(idea => {
            req.flash('success_msg', 'Idea updated');
            res.redirect('/ideas')
        });
    });
});

// Delete Idea
router.delete('/:id', (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(() => {
        req.flash('warning_msg', 'Idea removed');
        res.redirect('/ideas')
    });
});


module.exports = router;