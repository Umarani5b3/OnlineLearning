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


// Multer File upload settings
let multer = require('multer');
const DIR = './public/Subject';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: storage })

router.post('/uploadfile', upload.single('myFile'), (req, res, next) => {

    const file = req.file
    fs = require('fs')

    fs.readFile('./public/Subject/' + file.filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        let arr = data.split(' ')
        let newArr = arr.map(item => {
            return {
                'subject': item
            }
        })
        console.log(newArr);
        var docs = newArr
        var i = 0;
        var sub = new Subjects
        var bulk = sub.collection.initializeUnorderedBulkOp();  // test is the        model name. I used mongoose  
        // now using loop insert all json data inside bulk variable   
        for (i = 0; i < docs.length; i += 1) {
            bulk.insert(docs[i]);
        }
        //after insertion finished u might need node-async module, to insert first 
        //then asynchronously execute bulk 
        bulk.execute(function (errx) {
            if (errx) { return next(errx); }
            console.log('Success');
        });

    });
    console.log(file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)

})

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
    try {
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