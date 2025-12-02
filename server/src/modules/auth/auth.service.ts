import { prisma } from '../../config/db'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'  // Fixed: imported jwt directly


export const register = async (data: RegisterInput) => {
    try {
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
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET!,
            { expiresIn: '1d' }
        );

        // Return user data without password
        return {
            success: true,
            message: 'Registration successful',
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
        console.error('Registration error:', error);
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
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  return { token, user };
};