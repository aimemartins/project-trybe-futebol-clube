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
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

chai.use(chaiHttp);

const userMock = {
  email: 'valid_email@email.com',
  password: 'valid_password',
}
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgxMjIxMTc3LCJleHAiOjE2ODM4MTMxNzd9.QkUVx8QpWyqCxEv_NnhO_TXD16pLtzjbLXPxeZ4mPnk"

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
  awayTeamId: 16,
  awayTeamGoals: 2,
  inProgress: true,
}

const user = {
  id: 1,
  email: "email@email.com",
  username: "email",
  password: "12345678",
  role: "user"
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

  describe('A rota /matches/:id?finish deve receber um id de matches e poder finalizar uma partida no banco de dados', () => {
    it('Deve retornar o status 200 com a mensagem "Finished" ', async () => {
      sinon.stub(jwt, 'verify').resolves(user as Users)
      sinon.stub(Model, 'update').resolves([1])

      const httpResponse = await chai
        .request(app)
        .patch('/matches/1/finish').send()
        .auth(token, { type: 'bearer' })

      expect(httpResponse.status).to.be.equal(200);
      expect(httpResponse.body).to.be.deep.equal({ message: "Finished" });

    })
  })

})

describe('[ POST /matches ]', () => {

  afterEach(() => { sinon.restore() });

  describe('Caso ocorra um erro na requisição', () => {
    it('Deve retornar um status 422 caso o campo "homeTeam" e o "awayTeam" sejam iguais ', async () => {
      sinon.stub(Model, 'create').resolves(createdMatchMock as Matches)
      sinon.stub(jwt, 'verify').resolves(user as Users)
      const httpResponse = await chai
        .request(app)
        .post('/matches').send({
          homeTeamId: 16,
          awayTeamId: 16,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }).auth(token, { type: 'bearer' })

      expect(httpResponse.status).to.be.equal(422);
      expect(httpResponse.body).to.be.deep.equal({ "message": "It is not possible to create a match with two equal teams" });
    })

    it('Deve retornar um status 404 caso algum dos times não esteja cadastrado no banco de dados ', async () => {
      sinon.stub(jwt, 'verify').resolves(user as Users)
      sinon.stub(Model, 'findByPk').resolves(null)
      const httpResponse = await chai
        .request(app)
        .post('/matches').send({
          homeTeamId: 50,
          awayTeamId: 60,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }).auth(token, { type: 'bearer' })

      expect(httpResponse.status).to.be.equal(404);
      expect(httpResponse.body).to.be.deep.equal({ "message": "There is no team with such id!" });
    })

  })

  describe('Caso a requisição ocorra com sucesso', () => {
    it('Deve retornar um status 201 com os dados da partida', async () => {
      sinon.stub(Model, 'create').resolves(createdMatchMock as Matches)
      sinon.stub(jwt, 'verify').resolves(user as Users)
      const httpResponse = await chai
        .request(app)
        .post('/matches').send({
          homeTeamId: 16,
          awayTeamId: 12,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        }).auth(token, { type: 'bearer' })

      expect(httpResponse.status).to.be.equal(201);
      expect(httpResponse.body).to.be.deep.equal(createdMatchMock);
    })
  })
})