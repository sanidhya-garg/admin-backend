"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth_router = void 0;
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// import { Admin } from '../database/models';
// import { IAdmin } from '../database/models';
const prisma_1 = __importDefault(require("../prisma/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_router = express_1.default.Router();
exports.auth_router = auth_router;
auth_router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send({ message: 'Hello i AM READY' });
}));
auth_router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // the code has already been aproved till this point
        return res.send({ message: 'approved' });
    }
    catch (error) {
        console.log("error in auth.ts POST '/'");
        console.log(error);
        res.status(500).send({ message: 'Server error', error: error.message || "Internal Server Error" });
    }
}));
auth_router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, superUserCode } = req.body;
    console.log(req.body);
    if (superUserCode !== process.env.SUPER_USER_CODE) {
        return res.status(401).send('Unauthorized');
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const existingAdmin = yield prisma_1.default.admin.findUnique({ where: { username } });
        if (existingAdmin) {
            return res.status(400).send('Username already taken');
        }
        yield prisma_1.default.admin.create({
            data: {
                username,
                password: hashedPassword,
            },
        });
        res.status(201).send({ message: 'Admin registered successfully' });
    }
    catch (err) {
        console.error('Error during admin registration:', err); // Log the error
        res.status(500).send('Registration failed');
    }
}));
// auth_router.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   // const admin: IAdmin | null = await Admin.findOne({ username });
//   const admin = await prisma.admin.findUnique({
//     where: {
//       username: username
//     }
//   })
//   if (!admin) {
//     return res.status(404).send('Admin not found');
//   }
//   const isPasswordValid = await bcrypt.compare(password, admin.password);
//   if (!isPasswordValid) {
//     return res.status(401).send('Invalid password');
//   }
//   // Generate a JWT token
//   const token = jwt.sign({ userId: admin.id }, 'your-secret-key');
//   const userID = admin.id;
//   res.json({ token, userID });
// });
auth_router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(req.body);
    try {
        // Check if admin exists
        const admin = yield prisma_1.default.admin.findUnique({
            where: {
                username: username
            }
        });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        // Verify password
        const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Generate a JWT token (Use an environment variable for the secret key)
        const token = jsonwebtoken_1.default.sign({ userId: admin.id }, process.env.JWT_SECRET || 'default-secret-key');
        const userID = admin.id;
        console.log({ token, userID });
        // Respond with the token and user ID
        return res.status(201).json({ token, userID });
    }
    catch (err) {
        console.error('Error during admin login:', err);
        return res.status(500).json({ message: 'Login failed' });
    }
}));
