import * as express from 'express';
import { loginUser, logoutUser, registerUser } from './user.controller';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);

export default router;
