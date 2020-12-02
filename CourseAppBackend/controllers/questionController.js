const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//const validateToken = require('../customMiddlewares/verifyTokens')

var { Questions } = require('../models/questions');


// => localhost:3000/topic/

router.get('/:subjectId/:topicId/questions', (req, res, next) => {
    Questions.find({
        _subjectId: req.params.subjectId,
        _topicId: req.params.topicId,
    }).then((questions) => {
        res.send(questions);
    })
});

router.get('/', (req, res, next) => {
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

router.post('/:subjectId/:topicId/questions', (req, res, next) => {
    try {
        var que = new Questions({
            _subjectId: req.params.subjectId,
            _topicId: req.params.topicId,
            question: req.body.question,
            answer: req.body.answer,
        }); 
        que.save((err, doc) => {
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
        if (!err) { res.send(doc); }
        else { console.log('Error in Subject Delete :' + JSON.stringify(err, undefined, 2)); }
    });
    } catch (err) {
        next(err);
    }
});

module.exports = router;