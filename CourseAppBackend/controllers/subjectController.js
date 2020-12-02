const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//const validateToken = require('../customMiddlewares/verifyTokens')

var { Subjects } = require('../models/subjects');


// => localhost:3000/questions/

router.get('/', (req, res, next) => {
    Subjects.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Subject :' + JSON.stringify(err, undefined, 2)); }
    }).catch(next);
});

router.get('/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No Subject with given id : ${req.params.id}`);

            Subjects.findById(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Retriving Subject :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.post('/', (req, res, next) => {
    try {
        var sub = new Subjects({
            subject: req.body.subject,
        });
        sub.save((err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Subject Save :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.put('/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        var sub = {
            subject: req.body.subject,
        };
        Subjects.findByIdAndUpdate(req.params.id, { $set: sub }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Subject Update :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (req, res) => {
    try{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Subjects.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { 
            res.send(doc); 
        }
        else { console.log('Error in Subject Delete :' + JSON.stringify(err, undefined, 2)); }
    });
    } catch (err) {
        next(err);
    }
});

module.exports = router;