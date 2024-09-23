import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
// import { Admin } from '../database/models';
// import { IAdmin } from '../database/models';
import prisma from "../../prisma/prisma";
import jwt from 'jsonwebtoken';

const auth_router = express.Router();


auth_router.get('/', async (req: Request, res: Response) => {
 
      res.status(200).send({ message: 'Hello i AM READY'});
  
});

auth_router.post('/', async (req: Request, res: Response) => {
    try {
        // the code has already been aproved till this point
        return res.send({ message: 'approved' });
    
    } catch (error : any) {
        console.log("error in auth.ts POST '/'")
        console.log(error)
        res.status(500).send({ message: 'Server error', error: error.message || "Internal Server Error" });
    }
});

interface RegisterRequestBody {
  username: string;
  password: string;
  superUserCode: string;
}


auth_router.post('/register', async (req, res) => {
  const { username, password, superUserCode }: RegisterRequestBody = req.body;
  console.log(req.body);

  if (superUserCode !== process.env.SUPER_USER_CODE) {
    return res.status(401).send('Unauthorized');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { username } });
    if (existingAdmin) {
      return res.status(400).send('Username already taken');
    }

    await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).send({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error('Error during admin registration:', err);  // Log the error
    res.status(500).send('Registration failed');
  }
});



  auth_router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
  
    try {
      // Check if admin exists
      const admin = await prisma.admin.findUnique({
        where: {
          username: username
        }
      });
      
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate a JWT token (Use an environment variable for the secret key)
      const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET || 'default-secret-key');
      
      const userID = admin.id;

      console.log({ token, userID });
      
  
      // Respond with the token and user ID
      return res.status(201).json({ token, userID });
      
    } catch (err) {
      console.error('Error during admin login:', err);
      return res.status(500).json({ message: 'Login failed'});
    }
  });
  

export {auth_router}