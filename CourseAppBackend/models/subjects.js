const mongoose = require('mongoose');

var Subjects = mongoose.model('Subjects', {
    subject: { type: String },
});

module.exports = { Subjects };