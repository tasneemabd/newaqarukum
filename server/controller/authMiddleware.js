const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Remove 'Bearer ' from the token
    try {
      // Verify the token
      const decodedToken = jwt.verify(token, 'secret123');
      
      // Set the authenticated user's email in the request object
      req.loggedInUserEmail = decodedToken.email;
      next(); // Proceed to the next middleware
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  } 
};
module.exports = authMiddleware;
