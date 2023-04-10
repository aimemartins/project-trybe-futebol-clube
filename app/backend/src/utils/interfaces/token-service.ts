export interface IUserPayload {
  id:number;
  username: string
  role: string
  email:string;
}

export interface IAuthorization extends IUserPayload {
  iat: number;
  exp: number;
}

export default interface ITokenService {
  createToken(payload: IUserPayload): string
  verifyToken(token: string): void
}
