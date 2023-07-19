const express = require('express')
const app = express();
const login = require('./routes/login');
const tenants = require('./routes/tenants')
const users = require('./routes/users');
const videos = require('./routes/videos');
const comments = require('./routes/comments');
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/login', login);
app.use('/tenants', tenants);
app.use('/users', users)
app.use('/videos', videos);
app.use('/comments', comments)

app.listen(3001, (()=>{
    console.log('Listening on 3001')
}));
