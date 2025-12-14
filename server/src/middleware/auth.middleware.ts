import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export interface AuthRequest extends Request {
  user?: any;
}
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "No token provided" });
    }
  const token = authHeader.split('  ')[1];
    console.log('token: ',token)
    console.log(authHeader.split('  ')[0])
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      username: string;
    };
    req.user = decoded;
    next()
  } catch (err: any) {
    return res.status(401).json({
      message: "Invalid or expired token",
      err: err.message,
    });
  }
};
