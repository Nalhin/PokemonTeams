import * as mongoose from "mongoose";

const url: string = 'mongodb://127.0.0.1:27017/PokemonDreamTeams';

mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});