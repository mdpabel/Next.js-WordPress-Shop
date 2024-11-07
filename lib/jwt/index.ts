import jwt from 'jsonwebtoken';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;

type AuthResponse = {
  success: boolean;
  data?: {
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    data: {
      user: {
        id: string;
      };
    };
  };
  message?: string;
};

export const verifyToken = (token: string): AuthResponse => {
  try {
    // Verify token with secret key
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as AuthResponse['data'];

    // Return decoded payload if verification successful
    return { success: true, data: decoded };
  } catch (error) {
    console.error('Token verification failed:', error);
    return { success: false, message: 'Invalid or expired token.' };
  }
};
