const mongoose = require('mongoose');

var Questions = mongoose.model('Questions', {
    _subjectId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _topicId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    question: { type: String },
    answer: { type: String },
});

module.exports = { Questions };