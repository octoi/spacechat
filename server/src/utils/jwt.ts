import jwt from 'jsonwebtoken';

const jwtKey = process.env.JWT_KEY || 'n3v3r g0nn4 g1v3 y0u up';

export const generateToken = (data: any): string => {
  delete data?.password; // Password hash of user is in data btw, so we need to delete it
  return jwt.sign(data, jwtKey, { expiresIn: '100h' });
};

export const getUserFromReq = (req: any) => {
  return new Promise((resolve, reject) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      reject('Authorization header must be provided');
      return;
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
      reject("Authentication must be 'Bearer [token]'");
      return;
    }

    try {
      const user = jwt.verify(token, jwtKey);
      resolve(user);
    } catch (error) {
      reject('Invalid/Expired token');
    }
  });
};

// // get user from the context given by apollo, actually getting header, & getting user from it
// export const getUserFromContext = (context: { req: any }) => {
//   const token = getTokenFromHeader(context);

//   try {
//     const user = jwt.verify(token, jwtKey);
//     return user;
//   } catch (error) {
//     throw new GraphQLError('Invalid/Expired token');
//   }
// };

// // validate token and return token
// export const getTokenFromHeader = (context: { req: any }): string => {
//   const authHeader = context.req.headers.authorization;
//   if (!authHeader) throw new Error('Authorization header must be provided');

//   const token = authHeader.split('Bearer ')[1];
//   if (!token) throw new Error("Authentication must be 'Bearer [token]'");

//   return token;
// };
