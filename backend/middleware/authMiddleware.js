const jwt = require("jsonwebtoken");

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.split(" ")[1];
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const userId = decoded?.id || decoded?.user?.id;
  const role = decoded?.role || decoded?.user?.role || "customer";

  if (!userId) {
    throw new Error("Invalid token payload");
  }

  return {
    _id: userId,
    role,
  };
};

const protect = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    req.user = decodeToken(token);
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res.status(401).json({ message: "Not authorized" });
  }
};

const optionalProtect = (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);

    if (!token) {
      return next();
    }

    req.user = decodeToken(token);
    next();
  } catch {
    next();
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Not authorized, user not authenticated",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Not authorized as admin",
    });
  }

  next();
};

module.exports = { protect, optionalProtect, admin };