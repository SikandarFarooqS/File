const controller = {
  // Simple hello message
  getHello: (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Hello from MERN Backend!',
        data: {
          timestamp: new Date(),
          user: req.user || 'Guest'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  },

  // Protected hello message (requires authentication)
  getProtectedHello: (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Hello authenticated user!',
        data: {
          userId: req.user.id,
          email: req.user.email,
          timestamp: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message
      });
    }
  }
};

module.exports = controller;
