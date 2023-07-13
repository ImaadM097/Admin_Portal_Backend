const mongoose = require('../utils/mongooseCon')

const superAdminSchema = new mongoose.Schema({
    userName: String,
    password: String
});

const superAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = superAdmin;