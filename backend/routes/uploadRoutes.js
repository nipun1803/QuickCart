import express from 'express';
import upload from '../config/cloudinary.js';

const router = express.Router();

router.post('/', upload.single('image'), (req, res) => {
    try {
        res.json({
            message: 'Image uploaded successfully',
            image: req.file.path,
        });
    } catch (error) {
        res.status(500).json({ message: 'Image upload failed' });
    }
});

export default router;
