const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePicture: {
        type: String,
        default: null
    },
    lastLogin: {
        type: Date
    },
    role: {
        type: String,
        default: 'user'  // admin or user
    }
}, {
    timestamps: true  //creates createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;
