//  Estamos aplicando a SEGREGAÇÃO DE INTERFACE (NÃO TEMOS ATRIBUTOS OPCIONAIS)
// interface que eu recebo
export interface ILogin {
  email: string
  password: string
}

export interface IUser extends ILogin{
  username: string
  role: string

}
// interface que retorna do banco
// como ele extende de User, ele tem tudo que User tem + o id
export interface IUserWithId extends IUser {
  id: number
}

export default interface IUserService {
  // getAll(user: ILogin): Promise <IUserWithId[] | void>
  login(user: ILogin): Promise<IUserWithId | void>
}
