// Vamos extender de Error do Javascript (estamos aplicando HERANÇA)
export default class InvalidParamError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}
