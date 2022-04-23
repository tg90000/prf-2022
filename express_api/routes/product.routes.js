const router = require('express').Router()

const mongoose = require('mongoose')
const aruModel = mongoose.model('aru')

router.route('/product').post(
    (req, res) => {
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
    }
);

router.route('/product/:id?').get((req, res) => {
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
}).post((req, res) => {
    if(!req.params.id) {
        return res.status(400).send('Add meg milyen árut kell felvenni!')
    }
    if(req.body.ar && req.body.darab) {
        let aru = new aruModel({nev: req.params.id, ar: req.body.ar, 
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
}).put((req, res) => {
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
}).delete((req, res) => {
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

module.exports = router