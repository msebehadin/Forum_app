import {prisma} from '../../config/db'
import bcrypt from 'bcryptjs'
import { signToken } from '../../utils/jwt'
import { RegisterInput } from './auth.schema'
import { any, email, jwt, string } from 'zod'
export const register=async (data:any)=>{
       const exists=await prisma.user.findUnique({where:{email:data.email}})
        if(exists) throw new Error('email already registered')
            const hashed=await bcrypt.hash(data.password,10)
        const user=await prisma.user.create({
            data:{...data,password:hashed}
        })
        return {
            id:user.id,
            username:user.username,
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            createAt:user.createdAt
        }
}
export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h', 
  });

  return {
    message: 'Login successful',
    token,
    user,
  };
};