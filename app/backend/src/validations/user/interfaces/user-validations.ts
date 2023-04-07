/* quando uma validação não dá certo em vez de
retornar algo para outra camada eu lançado um erro */

import { ILogin } from '../../../services/interfaces/user-service';

export default interface IUserValidations {
  validateUser(user: ILogin): void
}
