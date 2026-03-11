import { prisma } from '../../config/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

type RegisterInput = {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
};

export const register = async (data: RegisterInput) => {
    try {
        if (!data.email || !data.password || !data.username || !data.firstName || !data.lastName) {
            throw new Error('All fields are required');
        }

        // Check if user exists
        const exists = await prisma.user.findUnique({ 
            where: { email: data.email } 
        });
        
        if (exists) {
            throw new Error('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword
            }
        });

        // Generate JWT token after registration (optional)
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret not configured');
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // Return user data without password
        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            }
        };

    } catch (error: any) {
        throw error;
    }
}

export const login = async (email: string, password: string) => {
  // 1. Check if user exists
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 2. Validate password
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate token
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not configured");
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  const { password: _password, ...safeUser } = user;
  return { token, user: safeUser };
};
