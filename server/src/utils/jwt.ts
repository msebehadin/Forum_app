import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

const SECRET: Secret = process.env.JWT_SECRET || 'dev_secret';

export const signToken = (
  payload: object,
  expiresIn: SignOptions['expiresIn'] = '1d'
) => jwt.sign(payload, SECRET, { expiresIn });

export const verifyToken = (token: string) =>
  jwt.verify(token, SECRET) as jwt.JwtPayload;
