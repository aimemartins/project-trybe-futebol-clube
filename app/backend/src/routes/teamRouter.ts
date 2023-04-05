import { Router } from 'express';
import TeamController from '../controllers/TeamsController';
import TeamService from '../services/TeamsService';
import TeamModel from '../database/models/TeamsModel';

const router = Router();

const teamService = new TeamService(TeamModel);
const teamController = new TeamController(teamService);

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
