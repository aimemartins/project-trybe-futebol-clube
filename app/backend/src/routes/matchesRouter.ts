import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import MatchesService from '../services/MatchesService';
import MatchesModel from '../database/models/MatchesModel';
import TeamsModel from '../database/models/TeamsModel';

const router = Router();

const matchesService = new MatchesService(MatchesModel, TeamsModel);
const matchesController = new MatchesController(matchesService);

router.get('/matches', matchesController.getAll);

export default router;
