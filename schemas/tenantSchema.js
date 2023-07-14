const mongoose = require('../utils/mongooseCon');

const tenantSchema = new mongoose.Schema({
    name: String,
    domain: String,
    active: Boolean,
    features: {
        volumeControlEnabled: Boolean,
        productDrawerEnabled: Boolean,
        reportEnabled: Boolean,
        likeEnabled: Boolean
    }
});
const tenant = mongoose.model('tenant', tenantSchema);
module.exports = tenant;

