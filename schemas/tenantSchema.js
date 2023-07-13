const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URL;

async function connect() {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'SuperAdminPortal',
      });
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

// const Tenant = mongoose.model('Tenant', tenantSchema);
// const myntra = new Tenant({name: 'Myntra',
//     domain: 'myntra.com',
//     active: true,
//     features: {
//         volumeControlEnabled: true,
//         productDrawerEnabled: true,
//         reportEnabled: true,
//         likeEnabled: true
// }})
// myntra.save();
