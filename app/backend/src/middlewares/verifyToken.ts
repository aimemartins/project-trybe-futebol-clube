import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/authToken';
// import ITokenService from '../utils/interfaces/token-service';

// export default class JwtTokenVerify {
//   _token: ITokenService;

//   constructor(token: ITokenService) {
//     this._token = token;
//   }

//   verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { authorization } = req.headers;
//       if (!authorization) {
//         return res.status(401).json({ message: 'Token not found' });
//       }
//       const payload = await this._token.verifyToken(authorization);
//       req.body.user = payload;
//       return next();
//     } catch (error) {
//       return res.status(401).json({ message: 'Token must be a valid token' });
//     }
//   };
// }

const validateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const payload = verifyToken(authorization);
    req.body.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default validateToken;
