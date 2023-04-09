import { Request, Response, NextFunction } from 'express';
import IUserController from './interfaces/user-controller';
import IUserService from '../services/interfaces/user-service';

export default class userController implements IUserController {
  private _userService: IUserService;

  constructor(userService: IUserService) {
    this._userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const token = await this._userService.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      // eu poderia usar aqui um res.status(500).json('internal error')
      // mas como eu preciso saber qual tipo de erro, eu delego quem saiba responder o tipo de erro que está acontecendo
      // nos middlewares de erro eu chamo o status code do erro ou um erro genérico
      next(error);
    }
  }
}

// import { Request, Response } from 'express';
// import { ILogin } from '../interfaces/index';
// import userService from '../services/UserService';

// export const userLogin = async (req: Request, res: Response) => {
//   const body = req.body as ILogin;
//   await userService.userLogin(body);
//   return res.status(200).json({ message: 'deu certo!' });
// };

// const userController = { userLogin };

// export default userController;
