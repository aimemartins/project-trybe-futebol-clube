import { Router } from 'express';
import TeamController from '../controllers/TeamsController';
import TeamService from '../services/TeamsService';
import TeamModel from '../database/models/TeamsModel';

const router = Router();

const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

router.get('/teams', teamController.getAll);
router.get('/teams/:id', teamController.getById);

export default router;
