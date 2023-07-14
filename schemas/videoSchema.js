const mongoose = require('../utils/mongooseCon')

const videoSchema = new mongoose({
    name: String,
    tenant: String,
    status: String,
    duration: String,
    url: String
})
const video = mongoose.model('videos', videoSchema);
module.exports = video