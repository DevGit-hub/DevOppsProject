// middleware/auth.js
import jwt from "jsonwebtoken";


export const auth = (req, res, next) => {
  try {

    let token =
      req.header("x-auth-token") ||
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.query.token;

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied." });
    }

   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    res.status(401).json({ message: "Invalid token." });
  }
};


export const adminOnly = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
