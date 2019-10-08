import * as express from 'express';
import {
  getTeams,
  saveTeam,
  getTeamById,
  deleteTeam,
  editTeam,
} from './team.controller';
import { authentication } from '../authentication/authentication';

const router = express.Router();

router.get('/team', getTeams);
router.get('/team/:id', getTeamById);
router.post('/team', authentication, saveTeam);
router.post('/team/:id', authentication, editTeam);
router.delete('/team/:id', authentication, deleteTeam);

export default router;
