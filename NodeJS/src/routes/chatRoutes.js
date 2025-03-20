import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createChat,
  sendMessage,
  getChatHistory
} from '../controllers/chatController.js';

const router = express.Router();

router.use(protect);

router.post('/', createChat);
router.post('/:chatId/message', sendMessage);
router.get('/:chatId/history', getChatHistory);

export default router;