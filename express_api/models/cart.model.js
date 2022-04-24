const mongoose = require('mongoose');

let aruSchema = new mongoose.Schema(
    {
        nev: {
            type: String,
            required: true
        },
        ar: {
            type: Number,
            required: true,
            min: [ 0, "Az ar nem lehet negativ" ]
        },
        darab: {
            type: Number,
            required: true,
            min: [ 0, "Nemnegativ mennyiseg kell"]
        }
    },
    {
        collection: 'aruk'
    }
);

module.exports = aruSchema
