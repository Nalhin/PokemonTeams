import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import pokemonRouter from './pokemon/pokemon.router';
import teamRouter from './team/team.router';
import userRouter from './user/user.router';

require('./mongodb');
const app: express.Application = express();

app.use(bodyParser.json());
app.use(cors());

app.use(pokemonRouter);
app.use(teamRouter);
app.use(userRouter);

export default app;
