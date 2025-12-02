import jwt from 'jsonwebtoken'
const SECRET=process.env.JWT_SECRET||'dev_secret';
export const signToken=(payload:object,expiresIn='1d')=>
    jwt.sign(payload,SECRET,{expiresIn});
export const verifyToken=(token:string)=>
    jwt.verify(token,SECRET) as any
