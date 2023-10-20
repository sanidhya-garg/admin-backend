import express, { Request, Response } from 'express';

const auth_router = express.Router();

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

export {auth_router}