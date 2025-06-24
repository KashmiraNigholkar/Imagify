import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expect "Bearer token"

  if (!token) return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Token. Login Again' });
  }
};

export default userAuth;
