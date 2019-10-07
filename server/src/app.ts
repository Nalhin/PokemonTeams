import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';

import pokemonRouter from './pokemon/pokemon.router';
import teamRouter from './team/team.router';
import userRouter from './user/user.router';
import './mongodb';

const app: express.Application = express();

if (process.env.NODE_ENV !== 'production') app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(pokemonRouter);
app.use(teamRouter);
app.use(userRouter);

export default app;
