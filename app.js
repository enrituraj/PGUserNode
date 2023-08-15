const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routes/route')

app.use('/',route )

app.listen(port, () => { 
    console.log(`Example app listening on port ${port}!`)
})