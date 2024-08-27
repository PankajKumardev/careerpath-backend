const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerSchema,loginSchema,updateProfileSchema,} = require('../validation/userValidation');
const fs = require('fs');
const path = require('path');
const { z } = require('zod');
const upload = require('../middleware/uploadMiddleware');

exports.uploadProfilePicture = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
   
    res.json({
        message: 'Profile picture uploaded successfully',
        file: req.file
    });
};


exports.registerUser = async(req,res) => {

    
    const validatedData = registerSchema.parse(req.body);
    const { username, name, email, password } = validatedData;

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    } 

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
}

exports.login = async (req,res) => {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;
    const user = await User.findOne({ email });

    if(!user) {
    return res.json(400).json({
        msg : "Not user found "
    })
    }

    const passwordCheck = await bcrypt.compare(password,user.password);

    if(!passwordCheck) {
        return res.json(400).json({
            msg : "Wrong Password"
        })
    }

    const token = jwt.sign(
        { userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
} 

exports.updateProfile = async (req, res) => {

        const validatedData = updateProfileSchema.parse(req.body);
        const { name, profilePicture } = validatedData;
        const userId = req.user.userId;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, profilePicture }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json(updatedUser);
    }


