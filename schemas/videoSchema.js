const mongoose = require('../utils/mongooseCon')

const videoSchema = new mongoose.Schema({
    name: String,
    tenant: String,
    status: String,
    duration: String,
    video: String
})
const video = mongoose.model('videos', videoSchema);
module.exports = video