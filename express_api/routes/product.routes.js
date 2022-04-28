const router = require('express').Router()
const passport = require('passport');

const mongoose = require('mongoose')
const aruModel = mongoose.model('aru')
const userModel = mongoose.model('user')

// router.route('/product').post(passport.authenticate('bearer', { session: false }),(req, res) => {
//     if (req.user.accessLevel !== 'Admin')return res.status(403).send('Ehhez nincs jogosultságod!');

//router.route('/product').post(async (req, res) => {

router.route('/product').post(passport.authenticate('bearer', { session: false }),(req, res) => {
    if (req.user.accessLevel !== 'Admin')return res.status(403).send('Ehhez nincs jogosultságod!');
    if(req.body.ar && req.body.darab) {
        let aru = new aruModel({nev: req.body.nev, ar: req.body.ar, 
            darab: req.body.darab})
        aru.save((err) => {
            if(err) {
                return res.status(500).send('Gond a db beszuras soran ' + err)
            }
            return res.status(200).send("Aru elmentve")
        })
    } else {
        return res.status(400).send("Hiányzik a darabszám vagy az ár")
    }
}).get(passport.authenticate('bearer', { session: false }), async(req,res) => {
    const products = await aruModel.find({ar: {$gt: 0}}, '-__v')
    res.status(200).json(products);
});

router.route('/product/:id?').get(passport.authenticate('bearer', { session: false }),(req, res) => {
    if(req.params.id) {
        aruModel.findOne({nev: req.params.id}, (err, aru) => {
            // ha itt az elso parameternek van erteke, akkor adatbázishiba történt
            // ezeket 500-as hibával (szerverhiba) szokás jelezni
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            if(!aru) return res.status(400).send('Nincs ilyen aru')
            return res.status(200).send(aru)
        })
    } else {
        aruModel.find((err, aruk) => {
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            return res.status(200).send(aruk)
        })
    }
}).put(passport.authenticate('bearer', { session: false }),(req, res) => {
    if(req.params.id) {
        if(req.body.ar || req.body.darab) {
            aruModel.findOne({nev: req.params.id}, (err, aru) => {
                if(err) return res.status(500).send('Hiba az aru lekerese kozben')
                if(!aru) return res.status(400).send('Nincs ilyen aru')
                if(req.body.ar) aru.ar = req.body.ar
                if(req.body.darab) aru.darab = req.body.darab
                aru.save((err) => {
                    if(err) {
                        return res.status(500).send('Gond a db beszuras soran ' + err)
                    }
                    return res.status(200).send("Aru frissítve")
                })
            })
        } else {
            return res.status(400).send("Nincs mit frissíteni")
        }
    } else {
        return res.status(400).send("Hiányzik az id")
    }
}).delete(passport.authenticate('bearer', { session: false }),(req, res) => {
    if (req.user.accessLevel !== 'Admin')return res.status(403).send('Ehhez nincs jogosultságod!');
    if(req.params.id) {
        aruModel.deleteOne({nev: req.params.id}, (err) => {
            if(err) return res.status(500).send('Hiba az aru törlése kozben')
            if(!aru) return res.status(400).send('Nincs ilyen aru')
            return res.status(200).send('Áru sikeresen törölve (ha benne volt)')
        })
    } else {
        aruModel.deleteMany((err) => {
            if(err) return res.status(500).send('Hiba az aru lekerese kozben')
            return res.status(200).send('Toroltem mindent')
        })
    }
})

router.route('/cart').post(passport.authenticate('bearer', { session: false }), async (req, res) => {
    console.log(req.user.accessLevel);
    const user = await userModel.findOne({username: req.user.username}, 'cart');
    const aru = await aruModel.findOne( {_id: req.body.aruID}, 'aru');
    console.log(user);
    console.log(aru);
    if (req.body.darab > aru.darab) {
        return res.status(400).send("Nincs eleg aru");
    }

    let contains = false;
    for (const _aru of user.cart) {
        if (_aru.aruID.toString() === req.body.aruID){
            if (_aru.darab + req.body.darab > aru.darab) {
                return res.status(400).send("Igy sincs eleg aru");
            } else {
                _aru.darab += req.body.darab;
                contains = true;
                break;
            }
        }
    }

    if (!contains){
        user.cart.push({product: req.body.product, amount: req.body.amount});
    }
    await user.save();
    res.status(200).send();

}).get(passport.authenticate('bearer', { session: false }),async (req,res) => {
    const user = await userModel.findOne({username: req.user.username}, '-_id cart')
        .populate({path: 'cart', populate:{ path: 'aruk', model: 'aru', select: '-__v'}});

    const cartContent = []
    for (const _aru of user.cart) {
        _aru.aru.darab = _aru.darab;
        cartContent.push({
            _id: _aru.aru._id,
            nev: _aru.aru.nev,
            ar: _aru.aru.ar,
            darab: _aru.aru.darab
        });
    }

    return res.status(200).json(cartContent);
}).delete(passport.authenticate('bearer', { session: false }),async (req, res) => {
    const user = await userModel.findOne({username: req.user.username}, 'cart');
    user.cart = []
    await user.save();
    res.status(200).send("Kosar kiuritve");
});

module.exports = router