import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import Matches from '../database/models/MatchesModel';
import Teams from '../database/models/TeamsModel';

const router = Router();

const service = new LeaderboardService(Teams, Matches);
const controller = new LeaderboardController(service);

// router.get('/leaderboard/home', (req, res) => res.json({ message: 'vc está em leader' }));
router.get('/leaderboard/home', controller.getHomeMatches);
router.get('/leaderboard/away', controller.getAwayMatches);

export default router;
