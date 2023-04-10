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



})