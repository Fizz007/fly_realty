const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
var cors = require('cors')
app.use(cors());
app.get('/', ()=> console.log('API is set'))

const userRoute = require('./Routes/userRoutes')
app.use(express.json())
app.use('/api/users',userRoute)

require('./connectDB')
const PORT = process.env.PORT
app.listen(PORT || 8000 , ()=> console.log(`server is running on ${PORT}`))

