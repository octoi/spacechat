import jwt from 'jsonwebtoken';

const jwtKey = process.env.JWT_KEY || 'n3v3r g0nn4 g1v3 y0u up';

export const generateToken = (data: any): string => {
  delete data?.password; // Password hash of user is in data btw, so we need to delete it
  return jwt.sign(data, jwtKey, { expiresIn: '100h' });
};
