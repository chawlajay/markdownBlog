const mongoose = require('mongoose');
// schema for DB to save blog in key value format
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Article',articleSchema);  // Article named table