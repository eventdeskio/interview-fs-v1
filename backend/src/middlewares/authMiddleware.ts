import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import pkg from "jsonwebtoken";

const  { JsonWebTokenError } = pkg;

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const header = req.headers['authorization'];

        //console.log("header: ",header)

        if (!header) {
            return res.status(401).json({ message: "Authorization header missing" });
        }

        const token = header?.split(' ')[1];
        //console.log("token: ",!token);

        if (!token || token === "null" ) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decode = jwt.verify(token, JWT_SECRET) as { username: string }
        //console.log(decode);

        req.body.username = decode.username;

        next();
    } catch(error) {
        if(error instanceof JsonWebTokenError){
            return res.status(401).json({ message: 'Unauthorized - Invalid token'});
        }
        else {
            console.error(`Unexpected error in auth middleware: ${(error as Error).message}`);
            return res.status(500).json({ message: "Server error while verifying token" });
        }
    }

}