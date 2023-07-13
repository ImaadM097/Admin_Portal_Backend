const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    tenant: String,
    role: String,
    active: Boolean
});

