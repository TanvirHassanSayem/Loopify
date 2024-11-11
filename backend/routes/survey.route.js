import express from 'express';
import { createSurvey, getSurveys } from '../controllers/survey.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protectRoute, createSurvey);
router.get('/', getSurveys);

export default router;