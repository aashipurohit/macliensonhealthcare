
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Middleware to protect routes
// const protect = async (req, res, next) => {
//     let token;

//     if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer")
//     ) {
//         try {
//             token = req.headers.authorization.split(" ")[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);

//             console.log("Decoded token:", decoded);

//             req.user = await User.findById(decoded.user.id).select("-password"); 
//             next();
//           } catch (error) {
//             console.error("Token verification failed:", error);
//             res.status(401).json({ message: "Not authorized, token failed" });
//           }
//         } else {
//           res.status(401).json({ message: "Not authorized, no token provided" });
//         }
//         };

//         //Middleware to check if the user is an admin
//         const admin = (req, res, next) => {
//             if (req.user && req.user.role === "admin") {
//                 next();
//             } else {
//                 res.status(403).json({ message: "Not authorized as an admin"});
//             }
//         };
        
//         module.exports = { protect, admin };




// deployed version --------------
       
       
// const jwt = require("jsonwebtoken");

// /**
//  * -----------------------------------------
//  * Authentication Middleware
//  * -----------------------------------------
//  * - Verifies JWT access token
//  * - Attaches minimal identity to req.user
//  * - Backward compatible with existing token payloads
//  * - Does NOT fetch user from DB (fast + safe)
//  */
// const protect = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // No Authorization header
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Not authorized, token missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Not authorized, token malformed",
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     /**
//      * Supported token payloads:
//      * 1. { id, role }
//      * 2. { user: { id, role } }
//      */
//     const userId = decoded?.id || decoded?.user?.id;
//     const role = decoded?.role || decoded?.user?.role || "customer";

//     if (!userId) {
//       return res.status(401).json({
//         message: "Not authorized, invalid token payload",
//       });
//     }

//     // Attach authoritative identity
//     req.user = {
//       _id: userId,
//       role,
//     };

//     next();
//   } catch (error) {
//     // Token expired or invalid
//     return res.status(401).json({
//       message: "Not authorized, token invalid or expired",
//     });
//   }
// };

// /**
//  * -----------------------------------------
//  * Admin Authorization Middleware
//  * -----------------------------------------
//  * - Requires protect middleware before this
//  */
// const admin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       message: "Not authorized, user not authenticated",
//     });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: "Not authorized as admin",
//     });
//   }

//   next();
// };

// module.exports = { protect, admin };


// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   try {

//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         message: "Not authorized, token missing",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const userId = decoded?.id || decoded?.user?.id;
//     const role = decoded?.role || decoded?.user?.role || "customer";

//     if (!userId) {
//       return res.status(401).json({
//         message: "Not authorized, invalid token payload",
//       });
//     }

//     req.user = {
//       _id: userId,
//       role,
//     };

//     next();

//   } catch (error) {

//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({ message: "Token expired" });
//     }

//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     return res.status(401).json({ message: "Not authorized" });
//   }
// };

// const admin = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({
//       message: "Not authorized, user not authenticated",
//     });
//   }

//   if (req.user.role !== "admin") {
//     return res.status(403).json({
//       message: "Not authorized as admin",
//     });
//   }

//   next();
// };

// module.exports = { protect, admin };

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