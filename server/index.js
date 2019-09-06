const express = require('express')
const bodyParser = require('body-parser')
const PORT = 3000
const api = require('./routes/api')
const app = express()
///////
const cors = require('cors')
const path = require('path');
///////
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));
///////
app.use(bodyParser.json())

app.use('/api', api)
app.listen(PORT, function(){
    console.log('server running on localhost:' + PORT)
})