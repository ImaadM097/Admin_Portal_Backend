const mongoose = require('../utils/mongooseCon')

const commentSchema = new mongoose.Schema({
    channel_name: String,
    title: String,
    comment_count: Number,
    comment: [String],
    inappropriate_comment_count: String,
})

const comment = mongoose.model('comment', commentSchema);
module.exports = comment