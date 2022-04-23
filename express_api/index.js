const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()

const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {console.log('db csatlakoztatva')})
mongoose.connection.on('error', (err) => {console.log('db csatlakozási hiba', err)})
mongoose.model('aru', require('./models/product.model'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use('/api/', require('./routes/product.routes'))

app.listen(3000, () => {
    console.log('A szerver fut')
})