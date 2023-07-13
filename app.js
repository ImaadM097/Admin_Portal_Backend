const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true }));
app.post('/login', async(req, res)=>{

})
app.listen(3001, (()=>{
    console.log('Listening on 3001')
}))
