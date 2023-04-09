import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import { Model } from 'sequelize';
import Users from '../database/models/UsersModel'
import UserService from '../services/UserService';

chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

// mock de um usuário cadastrado
const userMock = {
  email: 'valid_email@email.com',
  password: 'valid_password',
}


describe('POST /login', () => {

  afterEach(() => { sinon.restore() });

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
  describe('Caso na requisição um campo obrigatório seja inválido:', () => {
    it('Deve retornar um status 401, caso o campo "email" seja inválido  ', async () => {
      sinon.stub(Model, 'findOne').resolves(null)
      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'emailnaocadastrado@email.com',
          password: '123456'
        })

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.be.deep.equal({
        message: "Invalid email or password"
      })
    })

    it('Deve retornar um status 401, caso o campo "password" seja inválido ', async () => {

      sinon.stub(Model, 'findOne').resolves(userMock as Users)

      const httpResponse = await chai
        .request(app)
        .post('/login')
        .send({
          email: 'valid_email@email.com',
          password: 'invalid_password'
        })

      expect(httpResponse.status).to.be.equal(401);
      expect(httpResponse.body).to.be.deep.equal({
        message: "Invalid email or password"
      })
    })
  })
  // describe('Caso a requisição seja feita com sucesso:', () => {
  //   it('Deve retornar um status 200, com um token', async () => {

  //     // sinon.stub(Model, 'findOne').resolves(userMock as Users)

  //     const httpResponse = await chai
  //       .request(app)
  //       .post('/login')
  //       .send({
  //         email: 'valid_email@email.com',
  //         password: 'valid_password',
  //       })

  //     expect(httpResponse.status).to.be.equal(200)
  //     // expect(httpResponse.body).to.have.key('token')
  //     // expect(httpResponse.body.token).to.be.a('string')
  //   })
  // })

})