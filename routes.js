const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller.js');
const { register, login, isLoggedIn } = require('../middlewares/auth.js');

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Public routes
router.get('/hello', controller.getHello);

// Protected routes (require authentication)
router.get('/protected-hello', isLoggedIn, controller.getProtectedHello);

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    timestamp: new Date()
  });
});

module.exports = router;