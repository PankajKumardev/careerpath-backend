const express = require('express');
const {
    registerUser,
    login,
    updateProfile,
    uploadProfilePicture
} = require('../controllers/userController');
const authenticateToken = require('../middleware/authMiddleware'); 
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/register', registerUser);


router.post('/login', login);

router.post('/upload', upload.single('profilePicture'), (req, res) => {
    res.json({ message: 'Profile picture uploaded successfully' });
});



router.put('/profile', authenticateToken, updateProfile);

module.exports = router;
