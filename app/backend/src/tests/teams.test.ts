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

const teamsMock = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
]

describe('GET /teams', () => {

  afterEach(() => { sinon.restore() });

  describe('A rota /teams', () => {
    it('Deve retornar um status 200 com todos os times cadastrados no banco', async () => {
      sinon.stub(Model, 'findAll').resolves(teamsMock as any)
      const httpResponse = await chai
        .request(app)
        .get('/teams')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(teamsMock)
    })
  })

  describe('A rota /teams/:id', () => {
    it('Deve retornar um status 200 com o time cadastrado no banco de acordo com o id', async () => {
      sinon.stub(Model, 'findByPk').resolves(teamsMock[0] as any)
      const httpResponse = await chai
        .request(app)
        .get('/teams/1')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(teamsMock[0])
    })
  })

})