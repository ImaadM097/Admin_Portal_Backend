const express = require('express')
const app = express();
const login = require('./routes/login');
const tenants = require('./routes/tenants')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', login);
app.use('/tenants', tenants);

app.listen(3001, (()=>{
    console.log('Listening on 3001')
}));
