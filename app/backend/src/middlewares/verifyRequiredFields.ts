import { Response, Request, NextFunction } from 'express';
// verificar atributos obrigatórioss
const requestRequiredFields = {
  login: ['email', 'password'],
};

// a função vai retornar uma resposta (Response) ou não retorna nada (void)
const verifyRequiredFields = (route: keyof typeof requestRequiredFields) =>
  (req: Request, res: Response, next: NextFunction): Response | void => {
    const requiredFields = requestRequiredFields[route];
    // fazer um looping para verificar cada campo é encontrada no req.body
    for (let i = 0; i < requiredFields.length; i += 1) {
    // se no meu req.body não tiver meu requiredFields na posição i
      if (!req.body[requiredFields[i]]) {
        return res.status(400).json({ message: 'All fields must be filled' });
      }
    }
    next();
  };

export default verifyRequiredFields;
