import { ILogin } from '../../services/interfaces/user-service';
import InvalidParamError from '../../errors/invalid-params-error';
import IUserValidations from './interfaces/user-validations';

export default class UserValidations implements IUserValidations {
  validateUser = (user: ILogin): void => {
    const { email, password } = user;
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (password.length < 6 || !emailValidation.test(email)) {
      // essa classe InvalidParamError já ternorna Erro de statusCode 400
      throw new InvalidParamError('Invalid email or password');
    }
  };
}
