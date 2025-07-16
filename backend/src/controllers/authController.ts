import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const USERNAME= "123456";
const PASS= "abcdef";
const JWT_KEY = "secret";
export const loginController = async (req: Request, res: Response)=>{

    console.log(req.body)
    const { username, password } = req.body;

    if(!username || !password) return res.status(404).json({message:"Username or password not found"});

    if(username!==USERNAME || password!==PASS){
        return res.status(401).json({message:"User is unauthorized"});
    }

    const token = jwt.sign({username}, JWT_KEY);

    return res.status(201).json({message: "Logged In successfully", token});

}

export const authMiddleware = async (req: Request, res:Response , next:NextFunction)=>{

    const header = req.headers['authorization'];
    
    const token = header?.split(' ')[1];
    console.log(token);

    if(!token) return res.status(401).json({messsage:"Unauthorized"});

    const decode = jwt.verify(token, JWT_KEY) as { username: string}
    console.log(decode);

    req.body.username = decode.username;

    next();
    
}

