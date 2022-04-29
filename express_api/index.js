const express = require('express');
const mongoose = require('mongoose');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const path = require('path');
const cors = require('cors');

const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl)

mongoose.connection.on('connected', () => {console.log('db csatlakoztatva')})
mongoose.connection.on('error', (err) => {console.log('db csatlakozási hiba', err)})
mongoose.model('aru', require('./models/product.model'))
require('./models/user.model')
const userModel = mongoose.model('user')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors({
    origin: ['http://localhost:4200', 'https://prf-2022.herokuapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));


const jwtKEY = process.env.JWT_KEY;
passport.use('local', new LocalStrategy(async function (username, password, done) {
    const userModel = mongoose.model('user')
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return done('Hibas jelszo', false);
        return done(null, jwt.encode({username: user.username}, jwtKEY));
    })
}));

passport.use('bearer', new BearerStrategy(async function (token, done) {
    const payload = jwt.decode(token, jwtKEY);
    const user = await userModel.findOne({username: payload.username}, '-_id username accessLevel');
    if (!user){return done(null, false);}
    return done(null, user);
}));

app.use('/api/', require('./routes/product.routes'));
app.use('/api/', require('./routes/user.routes'));

app.use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', ((req, res) => res.render('pages/index')));
app.use((req, res) => { return res.sendFile(path.join(__dirname,'public/index.html')); });

app.listen(3000, () => {
    console.log('A szerver fut')
})