const express = require('express')
const app = express();
const login = require('./routes/login');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', login);

app.listen(3001, (()=>{
    console.log('Listening on 3001')
}));
