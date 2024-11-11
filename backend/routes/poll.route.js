import express from 'express';
import { createPoll, getPolls } from '../controllers/poll.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/polls', protectRoute, createPoll);
router.get('/polls', getPolls);

export default router;