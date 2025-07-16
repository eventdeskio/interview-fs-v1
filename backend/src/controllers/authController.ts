import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const USERNAME = "123456";
const PASS = "abcdef";
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const loginController = async (req: Request, res: Response) => {
    try {
        //console.log(req.body)
        const { username, password } = req.body;

        if (!username || !password) return res.status(404).json({ message: "Username or password not found" });

        if (username !== USERNAME || password !== PASS) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ username }, JWT_SECRET);

        return res.status(201).json({ message: "Logged In successfully", token, username });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }

}

export const protectedController = async (req: Request, res: Response) => {
    const username = req.body.username;

    if (username !== USERNAME) return res.status(401).json({ message: "User not authorized" });

    return res.status(200).json({ message: "User is authorized and this is a protected route" })
}



