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
import Matches from '../database/models/MatchesModel'


chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

const userMock = {
  email: 'valid_email@email.com',
  password: 'valid_password',
}

const MatchesMock = [
  {
    id: 1,
    home_team_id: 16,
    home_team_goals: 1,
    away_team_id: 8,
    away_team_goals: 1,
    in_progress: 0,
  },
  {
    id: 2,
    home_team_id: 9,
    home_team_goals: 1,
    away_team_id: 14,
    away_team_goals: 1,
    in_progress: 0,
  },
  {
    id: 3,
    home_team_id: 4,
    home_team_goals: 3,
    away_team_id: 11,
    away_team_goals: 0,
    in_progress: 0,
  },
  {
    id: 4,
    home_team_id: 3,
    home_team_goals: 0,
    away_team_id: 2,
    away_team_goals: 0,
    in_progress: 1,
  },
  {
    id: 5,
    home_team_id: 7,
    home_team_goals: 1,
    away_team_id: 10,
    away_team_goals: 1,
    in_progress: 1,
  },
  {
    id: 6,
    home_team_id: 5,
    home_team_goals: 1,
    away_team_id: 13,
    away_team_goals: 1,
    in_progress: 1,
  }]

const inProgressTrueMock = [{
  id: 4,
  home_team_id: 3,
  home_team_goals: 0,
  away_team_id: 2,
  away_team_goals: 0,
  in_progress: 1,
},
{
  id: 5,
  home_team_id: 7,
  home_team_goals: 1,
  away_team_id: 10,
  away_team_goals: 1,
  in_progress: 1,
},
{
  id: 6,
  home_team_id: 5,
  home_team_goals: 1,
  away_team_id: 13,
  away_team_goals: 1,
  in_progress: 1,
}
];

const inProgressFalseMock = [{
  id: 1,
  home_team_id: 16,
  home_team_goals: 1,
  away_team_id: 8,
  away_team_goals: 1,
  in_progress: 0,
},
{
  id: 2,
  home_team_id: 9,
  home_team_goals: 1,
  away_team_id: 14,
  away_team_goals: 1,
  in_progress: 0,
},
{
  id: 3,
  home_team_id: 4,
  home_team_goals: 3,
  away_team_id: 11,
  away_team_goals: 0,
  in_progress: 0,
}];

const finishedMatchMock = {
  id: 1,
  home_team_id: 16,
  home_team_goals: 1,
  away_team_id: 8,
  away_team_goals: 1,
  in_progress: 0,
}

const createdMatchMock = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
}

describe('[ GET /matches ]', () => {

  afterEach(() => { sinon.restore() });

  describe('Se na rota /matches não for passada nenhuma query:', () => {
    it('Deve retornar um status 200 com todos os matches cadastrados no banco', async () => {
      sinon.stub(Model, 'findAll').resolves(MatchesMock as any)
      const httpResponse = await chai
        .request(app)
        .get('/matches')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(MatchesMock);
    })
  })

  describe('Se na rota /matches for passada uma query:', () => {
    it('Deve retornar um status 200 com todos os matches com inProgress === "true" ', async () => {
      sinon.stub(Model, 'findAll').resolves(inProgressTrueMock as any)
      const httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=true')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(inProgressTrueMock);
    })

    it('Deve retornar um status 200 com todos os matches com inProgress === "false" ', async () => {
      sinon.stub(Model, 'findAll').resolves(inProgressFalseMock as any)
      const httpResponse = await chai
        .request(app)
        .get('/matches?inProgress=false')

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal(inProgressFalseMock);
    })
  })

  // describe('A rota /matches/:id?finish deve receber um id de matches e poder finalizar uma partida no banco de dados', () => {
  //   it('Deve retornar o status 200 com a mensagem "Finished" ', async () => {
  //     sinon.stub(Model, 'update').resolves()

  //     const httpResponse = await chai
  //       .request(app)
  //       .patch('/matches/1/finish')

  //     expect(httpResponse.status).to.be.equal(200);

  //   })
  // })



})

describe('[ POST /matches ]', () => {

  afterEach(() => { sinon.restore() });

  describe('Caso a requisição ocorra com sucesso', () => {
    // it('Deve retornar um status 201 com os dados da partida', async () => {
    //   sinon.stub(Model, 'create').resolves(createdMatchMock as Matches)

    //   const { body } = await chai
    //     .request(app)
    //     .post('/login')
    //     .send(userMock);
    //   // captura o token da resposta de login
    //   const { token } = body

    //   const httpResponse = await chai
    //     .request(app)
    //     .post('/matches').set('Authorization', `${token}`).send({
    //       homeTeamId: 16,
    //       homeTeamGoals: 2,
    //       awayTeamId: 8,
    //       awayTeamGoals: 2,
    //     })

    //   expect(httpResponse.status).to.be.equal(201);
    //   //expect(httpResponse.body).to.be.deep.equal(createdMatchMock);
    // })
  })

  describe('Caso ocorra um erro na requisição', () => {

  })
})