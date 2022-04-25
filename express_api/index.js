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
mongoose.model('user', require('./models/user.model'))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

passport.use('local', new LocalStrategy(function (username, password, done) {
    const userModel = mongoose.model('user')
    userModel.findOne({ username: username }, function (err, user) {
        if (err) return done('Hiba lekeres soran', null);
        if (!user) return done('Nincs ilyen felhasználónév', null);
        user.comparePasswords(password, function (error, isMatch) {
            if (error) return done(error, false);
            if (!isMatch) return done('Hibas jelszo', false);
            return done(null, user);
        })
    })
}));

passport.use('bearer', new BearerStrategy(function (token, done) {
    const payload = jwt.decode(token, jwtSecret);
    const user = userModel.findOne({username: payload.username}, '-_id username accessLevel');
    if (!user){return done(null, false);}
    return done(null, user);
}));


app.use('/api/', require('./routes/product.routes'));
app.use('/api/', require('./routes/user.routes'));

app.listen(3000, () => {
    console.log('A szerver fut')
})