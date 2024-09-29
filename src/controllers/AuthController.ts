import { Request, Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken";


interface LoginPayloadType {
    name: string
    email: string
    password?: string
    provider?: string
    oauth_id?: string
    image?: string
}

class AuthController {
    static async login(req: Request, res: Response) {
        try {
            console.log('req : ', req.body);
            const body:LoginPayloadType = req.body;
            let findUser = await prisma.user.findUnique({ where: { email: body.email } });

            if(!findUser) {
                findUser = await prisma.user.create({ data : req.body });
                return res.status(404).json({ success: true, message: "User Already Exist" });
            }

            let JWTPayload = {
                name: body.name,
                email: body.email,
                id: findUser.id
            }

            const token = await jwt.sign(JWTPayload, process.env.JWT_SECRET, { expiresIn: "24h" });

            return res.status(200).json({ success: true, message: "User Loggedin Successfully", data: { user: {...findUser, token: `Bearer ${token}` } } });

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

}


export default AuthController