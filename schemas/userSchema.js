const mongoose = require('../utils/mongooseCon');

const userSchema = new mongoose.Schema({
    name: String,
    tenant: String,
    role: String,
    active: Boolean
});
module.exports = mongoose.model('user', userSchema);

