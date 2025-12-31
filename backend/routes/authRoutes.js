import express from 'express';
import passport from 'passport';
import {
    register,
    login,
    logout,
    firebaseAuth,
    getProfile,
    updateProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import generateToken from '../utils/generateToken.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: `${process.env.FRONTEND_URL}/signin`,
        session: false
    }),
    (req, res) => {
        if (!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/signin?error=auth_failed`);
        }

        generateToken(res, req.user._id);

        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(frontendUrl);
    }
);


router.post('/firebase', firebaseAuth);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;