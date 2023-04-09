import * as jwt from 'jsonwebtoken';
import ITokenService, { IUserPayload } from './interfaces/token-service';

export default class JwtTokenService implements ITokenService {
  private _secret: jwt.Secret;
  private _options: jwt.SignOptions;

  constructor(private _jwt = jwt) {
    this._secret = process.env.JWT_SECRET || 'senha_secreta';
    this._options = {
      algorithm: 'HS256',
      expiresIn: '30d',
    };
  }

  createToken(payload: IUserPayload): string {
    return this._jwt.sign(payload, this._secret, this._options);
  }
}
