import {prisma} from '../../config/db'
import bcrypt from  'bcryptjs'
import jwt from 'jsonwebtoken'
export const register=async (data:any)=>{
    const {username,firstName,lastName,email,password}=data;
    const hashed=await bcrypt.hash(password,10);
    return await prisma.user.create({
        data:{
            username,
            firstName,
            lastName,
            email,
            password:hashed
        }
    })
}
export const login=async (email:string,password:string)=>{
    const user=await prisma.user.findUnique({where:{email}});
    if(!user) throw new Error('Invalid email')
        const valid=await bcrypt.compare(password,user.password)
    if(!valid) throw new Error('invalid password')
        const token=jwt.sign({id:user.id},process.env.JWT_SECRET!,{expiresIn:'1d'})
    return {
        message:'login successful',
        token,
        user

    }

}