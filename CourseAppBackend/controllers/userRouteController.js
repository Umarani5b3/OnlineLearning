let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
var ObjectId = require('mongoose').Types.ObjectId;
router = express.Router();


// Multer File upload settings
const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});


// Multer Mime Type Validation
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


// User model
let User = require('../models/users');

// POST User
router.post('/create-user', upload.single('avatar'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        mobile: req.body.mobile,
        email: req.body.email,
        password: User.hashPassword(req.body.password),
        avatar: url + '/public/' + req.file.filename,
    });
    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: "User registered successfully!",
            userCreated: {
                _id: result._id,
                username: result.username,
                mobile: result.mobile,
                email: result.email,
                password: result.password,
                avatar: result.avatar,
            }
        })
    }).catch(err => {
        console.log(err),
            res.status(500).json({
                error: err
            });
    })
})


// GET All User
router.get('/:id', (req, res, next) => {
    try {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);

        User.findById(req.params.id, (err, doc) => {
            if (!err) { 
                return res.json({
                    _id: doc._id,
                    username: doc.username,
                    avatar:doc.avatar,
                    email:doc.email,
                    mobile:doc.mobile
                })
            }
            else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
        });
    } catch (err) {
        next(err);
    }
});


// GET User
router.post("/sign-in", async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const cmp = await user.compare(req.body.password, user.password);
            if (cmp) {
                //Access Token
                const token = jwt.sign({ email: user.email, _id: user._id.toHexString() }, 'hjn6jvn2ais1knpw1222kinsisan13y787y1787', { expiresIn: Math.floor(Date.now() / 1000) + (60 * 60) })
                const data = Object.assign({}, user._doc)
                delete data.password;
                res.status(201);
                return res.json({
                    sc: 201,
                    sm: 'Login Successful',
                    authToken: token,
                    data: data
                })
            } else {
                res.status(401);
                return res.json({
                    sc: 401,
                    sm: 'Wrong password.'
                })
            }
        } else {
            res.status(401);
            return res.json({
                sc: 401,
                sm: 'Wrong email or password.'
            })
        }
    } catch (err) {
        next(err);
    }
});


module.exports = router;