import { Request, Response, NextFunction } from "express";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

const authenticationMiddleware = (req : Request, res : Response, next : NextFunction) => {
    console.log(ADMIN_PASSWORD)
    const code : string | undefined = req.body.code;
    if (code === ADMIN_PASSWORD) next();
    else res.status(403).json({"error" : 'Access denied: Invalid code'});
};

export {authenticationMiddleware}