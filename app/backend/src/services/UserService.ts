// import Users from '../database/models/UsersModel';
import IUserValidations from '../validations/user/interfaces/user-validations';
import IUserService, { ILogin, IUserWithId } from './interfaces/user-service';

export default class UserService implements IUserService {
  private _userValidations: IUserValidations;

  constructor(userValidations: IUserValidations) {
    this._userValidations = userValidations;
  }

  async login(login: ILogin): Promise<IUserWithId | void> {
    this._userValidations.validateUser(login);
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
