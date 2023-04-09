import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);
describe('POST /login', () => {

  describe('Caso na requisição falte um campo obrigatório:', () => {
    it('Deve retornar um status 400, caso o campo "email" não seja informado', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          password: '123456'
        })
      // cada vez que eu fizer um expect é importante testa primeiro para fazer o próximo
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: "All fields must be filled" })

    })

    it('Deve retornar um status 400, caso o campo "password" não seja informado', async () => {
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'email@email.com'
        })
      // cada vez que eu fizer um expect é importante testa primeiro para fazer o próximo
      expect(httpResponse.status).to.be.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ message: "All fields must be filled" })

    })





  })
  describe('Caso a requisição seja feita com sucesso:', () => { })
})