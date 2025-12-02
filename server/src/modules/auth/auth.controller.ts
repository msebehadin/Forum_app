import { Request,Response } from "express";
import * as authService from './auth.service' 
export const register=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const user=await authService.register(data)
        res.status(201).json({message:'user registers',user})
    } catch (err) {
        console.log(err)
    }
}
export const login=async (req:Request,res:Response)=>{
    try{
        const data=req.body;
        const user=await authService.login(data)
        res.status(201).json({message:'user login',user})
    }
    catch(err){
console.log(err)
    }
}