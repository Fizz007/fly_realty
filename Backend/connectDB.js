const mongoose = require('mongoose')

mongoose.connect(process.env.URL, {
    dbName: "NewUser"
})
.then(()=> {
console.log('connection db succesful')
})
.catch((err)=> {
    console.log(`Error: ${err.message}`)
})