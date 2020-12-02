const mongoose = require('mongoose');

var Topics = mongoose.model('Topics', {
    _subjectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    topic: { type: String },
});

module.exports = { Topics };