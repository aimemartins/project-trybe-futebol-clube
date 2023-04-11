import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';
import validateToken from '../middlewares/verifyToken';
import TeamsService from '../services/TeamsService';

const router = Router();

const matchesService = new MatchesService(MatchesModel, TeamsModel);
const teamService = new TeamsService(TeamsModel);
const matchesController = new MatchesController(matchesService, teamService);

router.get('/matches', matchesController.getAll);
router.patch('/matches/:id', validateToken, matchesController.updateMatch);
router.patch('/matches/:id/finish', validateToken, matchesController.finishProgress);
router.post('/matches', validateToken, matchesController.createMatch);

export default router;
