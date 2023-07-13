const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URL;

async function connect() {
    mongoose.connect(uri);
}
connect().then(()=>console.log('connected')).catch((e)=>console.log(e));
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

