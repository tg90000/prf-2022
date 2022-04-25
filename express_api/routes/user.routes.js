const router = require('express').Router()
const passport = require('passport');

const mongoose = require('mongoose')
const userModel = mongoose.model('user')

router.route('/login').post(passport.authenticate('local', { session: false }),(req, res) => {
    res.send({token: req.user});
});


router.route('/register').post(async (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.password) return res.status(400).send("Hiányos adatok, adj meg: felhasználónevet, emailt és jelszót!");
    //let inUse = await userModel.exists({username: req.body.username});
    //console.log(inUse);
    //if (inUse) return res.status(400).send("Felhasználónév foglalt, válassz másikat!");
    //inUse = userModel.exists({email: req.body.email});
    //if (inUse) return res.status(400).send("Van már felhasználó ilyen email címmel!");


    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });


    await user.validate();
    await user.save({validateBeforeSave: false});
    return res.status(200).send("Siker!");

})

module.exports = router