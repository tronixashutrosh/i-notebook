const connetToMongo = require('./db');
const express = require('express');
var cors= require('cors')


connetToMongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json());

// routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})