import express from 'express';
import  { handleGenerateNewShortUrl, handleGetAnalytics } from '../controllers/url.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home URL Page')
} );

router.get('/analytics/:shortId', handleGetAnalytics );

router.post('/', handleGenerateNewShortUrl );

export default router;