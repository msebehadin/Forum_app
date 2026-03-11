import { Request,Response } from "express";
import * as authService from './auth.service' 
export const register=async (req:Request,res:Response)=>{
    try {
        const data=req.body;
        const user=await authService.register(data)
        res.status(201).json({success:true,message:'user registered',data:user})
    } catch (err: any) {
        res.status(400).json({success:false,message: err.message || 'Registration failed'})
    }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
