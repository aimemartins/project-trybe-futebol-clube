export interface IUserPayload {
  id:number;
  email:string;
}

export default interface ITokenService {
  createToken(payload: IUserPayload): string
}
