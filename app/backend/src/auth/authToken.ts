import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'batatinha';

export const verifyToken = (token: string) => jwt.verify(token, secret);

const auth = { verifyToken };

export default auth;
