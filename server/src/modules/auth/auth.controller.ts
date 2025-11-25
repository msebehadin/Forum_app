import { Request,Response } from "express";
import * as authService from './auth.service';


export const register=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const user= await authService.register(data);
        res.status(201).json({message:'user registered ',user})
    } catch (err:any) {
        res.status(500).json({error:err.message});

    }
} 
export const login=async (req:Request,res:Response)=>{
    try {
        const {email,password}=req.body;
        const result=await authService.login(email,password)
        res.json(result)
    } catch (err:any) {
        res.status(401).json({error:err.message})
    }
}