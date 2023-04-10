import * as bcrypt from 'bcryptjs';
import ITokenService, { IUserPayload } from '../utils/interfaces/token-service';
import UserModel from '../database/models/UsersModel';
import IUserValidations from '../validations/user/interfaces/user-validations';
import IUserService, { ILogin } from './interfaces/user-service';
import UnauthorizedUserError from '../errors/unauthorized-error';

export default class UserService implements IUserService {
  private _userValidations: IUserValidations;
  private _tokenService: ITokenService;

  constructor(
    userValidations: IUserValidations,
    private _model = UserModel,
    tokenService: ITokenService,
  ) {
    this._userValidations = userValidations;
    this._tokenService = tokenService;
  }

  // async verifyPassword(password:string, dbPassword:string) {
  //   await bcrypt.compare(password, dbPassword);
  // }

  async login(login: ILogin): Promise<string | void> {
    const { email, password } = login;
    // validar campos
    this._userValidations.validateUser(login);
    // o usuário existe no banco?
    const user = await this._model.findOne({ where: { email } });

    // const verifyPassword = await bcrypt.compare(password, user.password);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedUserError('Invalid email or password');
    }
    // se o usuário existe no banco
    const payload: IUserPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = this._tokenService.createToken(payload);
    return token;

    // const user = await this.login
  }

  async getRole(email: string) {
    const user = await this._model.findOne({ where: { email } });

    if (!user) {
      return undefined;
    }
    const { role } = user.dataValues;
    return role;
  }
}

// // import { ModelStatic } from 'sequelize';
// import UserModel from '../database/models/UsersModel';
// import { ILogin } from '../interfaces/index';

// const userLogin = async (login: ILogin) => {
//   const { email } = login;
//   const user = await UserModel.findOne({ where: { email } });
//   console.log('USERSERVICE', user);
//   return user;
// };

// const userService = { userLogin };

// export default userService;
