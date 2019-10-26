import express from 'express';
import {
  authorizeUser,
  loginUser,
  logoutUser,
  registerUser,
} from './user.controller';
import { authentication } from '../authentication/authentication';

const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/logout', logoutUser);
router.get('/user/authorize', authentication, authorizeUser);

export default router;
