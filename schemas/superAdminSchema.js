const mongoose = require('../utils/mongooseCon')

const superAdminSchema = new mongoose.Schema({
    userName: String,
    role: String,
    password: String,
    firstName: String,
    lastName: String,
    image: String
});

const superAdmin = mongoose.model('superAdmin', superAdminSchema);

module.exports = superAdmin;