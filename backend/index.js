require('dotenv').config(); // Load environment variables from .env file

const connectToMongo = require('./db');
connectToMongo();



// Continue your setup...
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`inotebook backend listening at http://localhost:${port}`)
})
