import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if(authHeader === null || authHeader === undefined) {
            return res.status(401).json({ status: false, message: "Unauthorized Access..." });
        }

        const token = authHeader.split(" ")[1];

        // verify the token
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if(err) {
                return res.status(403).json({ status: false, message: "Invalid Token..." });
            }

            req.user = user as AuthUser;
            next();
        })
    } catch (error) {
        console.log('Error in Auth Middleware : ', error);
        return res.status(401).json({ status: false, message: "Unauthorized Access..." })
    }
}

export default authMiddleware;