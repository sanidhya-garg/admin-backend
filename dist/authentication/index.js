"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Your secret key for signing and verifying JWTs
const secretKey = 'your-secret-key';
const authenticationMiddleware = (req, res, next) => {
    // Check if the Authorization header is present in the request
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }
    // Verify and decode the token
    jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        // If the token is valid, you can access the payload (decoded) in subsequent middleware or route handlers
        req.user = decoded;
        if (req.body.userID) {
            if (req.body.userID !== decoded.userId.toString()) {
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            }
        }
        next();
    });
};
exports.authenticationMiddleware = authenticationMiddleware;
