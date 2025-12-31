import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
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



router.get(
    '/google',
    (req, res, next) => {
        // Manually saving session before redirecting to Google to ensure state is set
        // if using session-based state.
        next();
    },
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false // We really should use session for state, but if we go stateless, we need state: true/false.
    })
);

router.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/signin?error=oauth`,
    }),
    (req, res) => {
        if (!req.user) {
            return res.redirect(`${process.env.FRONTEND_URL}/signin?error=oauth`);
        }


        const tempToken = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2m' }
        );


        res.redirect(
            `${process.env.FRONTEND_URL}/auth/callback?temp=${tempToken}`
        );
    }
);



router.get('/oauth/finalize', (req, res) => {
    try {
        const { temp } = req.query;
        if (!temp) return res.sendStatus(401);

        const decoded = jwt.verify(temp, process.env.JWT_SECRET);

        generateToken(res, decoded.id);

        res.json({ success: true });
    } catch (error) {
        res.sendStatus(401);
    }
});



router.post('/firebase', firebaseAuth);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

export default router;