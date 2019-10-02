import * as express from 'express';

import pokemonRouter from './pokemon/pokemon.router'

require('./mongodb');

const app = express();
const port = 5000;

app.use(pokemonRouter);

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`);
});