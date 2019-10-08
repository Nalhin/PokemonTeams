import * as express from 'express';
import { getTeams, saveTeam, getTeamById, deleteTeam } from './team.controller';
import { authentication } from '../authentication/authentication';

const router = express.Router();

router.get('/team', getTeams);
router.get('/team/:id', getTeamById);
router.post('/team', authentication, saveTeam);
router.delete('/team/:id', authentication, deleteTeam);

export default router;
