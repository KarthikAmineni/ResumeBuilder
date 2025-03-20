import Chat from '../models/Chat.js';
import { getAIFeedback } from '../utils/aiService.js';
import { io } from '../server.js';

export const createChat = async (req, res) => {
  try {
    const { resumeId } = req.body;
    const chat = await Chat.create({
      userId: req.user.id,
      resumeId,
      messages: []
    });

    res.status(201).json({
      status: 'success',
      data: { chat }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { content } = req.body;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found'
      });
    }

    // Add user message
    chat.messages.push({
      sender: 'user',
      content
    });

    // Get AI response
    const aiResponse = await getAIFeedback(content);
    chat.messages.push({
      sender: 'ai',
      content: aiResponse
    });

    await chat.save();

    // Emit message to connected clients
    io.to(chatId).emit('new-message', {
      chatId,
      messages: chat.messages.slice(-2)
    });

    res.status(200).json({
      status: 'success',
      data: { chat }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getChatHistory = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user.id
    });

    if (!chat) {
      return res.status(404).json({
        status: 'error',
        message: 'Chat not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { chat }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};