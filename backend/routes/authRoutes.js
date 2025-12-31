import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
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
// router.post('/login', login); // Removed duplicate
router.post('/logout', logout);

// Google OAuth Routes
router.get('/google', (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID) {
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        return res.redirect(`${frontendUrl}/signin?error=oauth_missing`);
    }
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin', session: false }),
    (req, res) => {
        // Successful authentication
        if (!req.user) {
            return res.redirect('/signin?error=auth_failed');
        }

        const token = generateToken(res, req.user._id);

        // Redirect to frontend with token
        // In production, use environment variable for frontend URL
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    }
);


router.post('/firebase', firebaseAuth);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;
