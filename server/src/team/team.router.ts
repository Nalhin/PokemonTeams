import * as express from 'express';
import { getTeams, postTeam, getTeamById, deleteTeam } from './team.controller';

const router = express.Router();

router.get('/team', getTeams);
router.get('/team/:id', getTeamById);
router.post('/team', postTeam);
router.delete('/team/:id', deleteTeam);

export default router;
