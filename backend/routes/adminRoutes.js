import express from 'express';
import {
    getDashboardStats,
    getAllUsers,
    getRevenueAnalytics,
    getCategoryAnalytics,
} from '../controllers/adminController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.get('/analytics/revenue', protect, adminOnly, getRevenueAnalytics);
router.get('/analytics/category', protect, adminOnly, getCategoryAnalytics);

export default router;
