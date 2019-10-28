[![Build Status](https://travis-ci.org/Nalhin/PokemonTeams.svg?branch=master)](https://travis-ci.org/Nalhin/PokemonTeams) [![codecov](https://codecov.io/gh/Nalhin/PokemonTeams/branch/master/graph/badge.svg)](https://codecov.io/gh/Nalhin/PokemonTeams)

# Pokemon Teams

A website that allows users to create teams with their favourite pokemon and share them with others. Users can also inspect 3D models of their favourite pokemon courtesy of thee.js.

## Showcase

![pokemon](showcase/pokemon.JPG)

![charizard](showcase/charizard.JPG)

![teams](showcase/teams.JPG)

![team](showcase/team.JPG)

Screens taken via Chrome Web Tools (iPhone 6/7/8)

## Stack

#### App

- React
- Typescript
- React Router
- Redux
- Redux-Saga
- Three.js
- Immer
- Emotion
- Material UI

#### Server

- Node
- Typescript
- Express
- Mongodb
- Mongoose
- JWT for authentication

#### Testing

- Jest
- React Testing Library
- Supertest
- Travis
- Codecov

#### Hosting

- Zeit
- Heroku
- Docker

#### Data

- Python
- Beautiful Soup
- Pillow 
- Zipfile

## Api

[Documentation](https://documenter.getpostman.com/view/8005247/SVtbRkgN?version=latest).

## Requirements

Install node package manager [npm](https://www.npmjs.com/).
You should be able to run the following commands.

```bash
node --version
npm --version
```

Install [mongodb](https://www.mongodb.com/) and add it to PATH.
You should be able to run the following command.

```bash
mongo --version
```

## App

#### Installation

```bash
git clone https://github.com/Nalhin/PokemonTeams
cd app
npm install
```

####  Start

```bash
cd app
npm run start
```

## Server

#### Installation

```bash
git clone https://github.com/Nalhin/PokemonTeams
cd server
npm install
cd ../data
import_into_local_mongodb.bat
```

####  Start

```bash
cd server
npm run start
```

## Models, Images and Data

All models and images are downloaded from [this](https://www.models-resource.com/3ds/pokemonxy/) website via python web scrapping scripts.
After being downloaded, models are then converted to .glb format with open source converters ([fbx2glb](https://github.com/facebookincubator/FBX2glTF), [obj2glb](https://www.npmjs.com/package/obj2gltf), [collada2glb](https://github.com/KhronosGroup/COLLADA2GLTF)).
Pokemon data comes from [pokemondb](https://pokemondb.net/pokedex/all).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
