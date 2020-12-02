const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//const validateToken = require('../customMiddlewares/verifyTokens')

var { Topics } = require('../models/topics');


// => localhost:3000/topic/

router.get('/subject/:subjectId/topics', (req, res, next) => {
    Topics.find({
        _subjectId: req.params.subjectId
    }).then((topics) => {
        res.send(topics);
    })
});

router.get('/subject', (req, res, next) => {
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

router.post('/subject/:subjectId/topics', (req, res, next) => {
    try {
        console.log(res)
        var top = new Topics({
            _subjectId: req.params.subjectId,
            topic: req.body.topic
        }); 
        top.save((err, doc) => {
            if (!err) { res.send(doc); 
            }
            else { console.log('Error in Subject Save :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.put('/subject/:subjectId/topics/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        var top = {
            topic: req.body.topic,
        };
        Topics.findByIdAndUpdate(req.params.id, { $set: top }, { new: true }, (err, doc) => {
            if (!err) { res.send(doc); }
            else { console.log('Error in Subject Update :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});

router.delete('/subject/:subjectId/topics/:id', (req, res) => {
    try{
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Topics.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Subject Delete :' + JSON.stringify(err, undefined, 2)); }
    });
    } catch (err) {
        next(err);
    }
});

module.exports = router;