const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minlength: [4, "Username must be at least 4 characters."],
            maxlength: [20, "Username must not be longer than 20 characters."],
            validate: {
                validator: function(name){
                    return /^[a-z0-9_\-]+$/i.test(value);
                },
                message: 'Username must contain only alphanumeric characters, underscores and dashes.'
            }
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(value);
                },
                message: 'Email must be a valid email address.'
            }
        },
        password: {
            type: String,
            required: true,
            minlength: [ 6, "Password must be at least 6 characters." ]
        },
        accessLevel: {
            type: String,
            default: 'User',
            values: ['User', 'Admin']
        },
        cart: [new mongoose.Schema({
            product: mongoose.ObjectId,
            amount: Number
        })]
    },
    {
        collection: 'users'
    }
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            const salt = await  bcrypt.genSalt(8);
            user.password = await bcrypt.hash(user.password, salt);
        } catch (e) {
            console.log('Error during password encryption!')
            next(e)
        }
    } else {
        next();
    }
});