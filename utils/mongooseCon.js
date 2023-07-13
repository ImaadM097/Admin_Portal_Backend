const mongoose = require('mongoose')
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

module.exports = mongoose;