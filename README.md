[![Build Status](https://travis-ci.org/Nalhin/PokemonTeams.svg?branch=master)](https://travis-ci.org/Nalhin/PokemonTeams)
[![codecov](https://codecov.io/gh/Nalhin/PokemonTeams/branch/master/graph/badge.svg)](https://codecov.io/gh/Nalhin/PokemonTeams)
![License](https://img.shields.io/github/license/Nalhin/PokemonTeams)

# Pokemon Teams

A web application that allows users to create and share teams consisting of their favourite Pokemon. 
Users can also inspect 3D models of their favourite pokemon.

## Table of contents

* [Description](#description)
* [Features](#features)
* [Screenshots](#screenshots)
* [Folder Structure](#folder-structure)
* [Technology Stack](#technology-stack)
* [API](#api)
* [Setup](#setup) 
* [License](#license)

## Description

Website is written in Typescript utilizing React with Flux architecture (Redux). 
Material UI was used as the component library of choice combined with Emotion for custom styles.
Three.js is used to render interactive 3D models of pokemon.
Communication between frontend and backend was implemented with the use of REST API. 
Each request is handled with its own saga, and stored in Redux store for cache management. 
Backend is written in Typescript with Express framework. Authentication is implemented with http-only cookie (JWT) attached to each request.
As far as database is concerned, MongoDB was chosen, after the evaluation of data complexity (multiple relations were not needed).

## Features

* User authentication and authorization
* Interactive 3D models.
* CRUD functionality.

## Screenshots

#### Overview

<a align="center" href="https://youtu.be/jDBPPlOJ_EU"> 
  <img src="showcase/project-overview.gif" style="max-width:500px;"  alt="Overview"/>
</a>

#### Pokemon

<p align="center"> 
  <img src="showcase/pokemon-mobile.png" style="max-width:500px;"  alt="Pokemon"/>
</p>

#### Single Pokemon

<p align="center"> 
  <img src="showcase/pokemonsingle-mobile.png" style="max-width:500px;"  alt="Pokemon Single"/>
</p>

#### Teams

<p align="center"> 
   <img src="showcase/teams-mobile.png" style="max-width:500px;"  alt="Teams"/>
</p>
  
#### Teams Desktop

<p align="center"> 
  <img src="showcase/teams.png" style="max-width:500px;"  alt="Teams IPad"/>
</p>

#### Team
 
<p align="center"> 
  <img src="showcase/team-mobile.png" style="max-width:500px;"  alt="Team"/>
</p>
    
## Folder Structure

#### Frontend

```
src
├── components (Reusable components used throughout the entire application)
├── interfaces (Typescript interfaces)
├── routes (Routes with corresponding components)
├── store (Redux boilerplate implemented in "Duck" architecture - feature first approach).
│   ├── *.actions.ts 
│   ├── *.reducer.ts
│   ├── *.saga.ts 
│   ├── *.types.ts
│   └── *.api.ts
├── styles (styling constants)
├── utils (utility functions)
└── \__tests__ (test files are always located next to corresponding functionality)
```

#### Backend

Feature first approach (so called "Duck" architecture).
Each folder consists of (unless not required by implementation) the following:
```
├── *.controller.ts (routes)
├── *.interface.ts (typescript definitions)
├── *.model.ts (mongoose model)
├── *.router.ts (express routes)
└── \__tests__ (test files are always located next to corresponding functionality)
```
## Technology Stack

#### App

* Typescript
* React
* React Router
* Redux
* Redux-Saga
* Three.js
* Emotion
* Material UI

#### Backend

* Node
* Typescript
* Express
* Mongodb
* Mongoose
* JWT

#### Testing

* Jest
* React Testing Library
* Supertest
* Travis
* Codecov

#### Data

* Python
* Beautiful Soup
* Pillow 
* Zipfile

## API

[API Postman documentation](https://documenter.getpostman.com/view/8005247/SVtbRkgN?version=latest).

## Models, Images and Data

All models and images are downloaded from [this](https://www.models-resource.com/3ds/pokemonxy/) with python web scrapping scripts.
After being downloaded, models are then converted to .glb format utilizing open source converters ([fbx2glb](https://github.com/facebookincubator/FBX2glTF), [obj2glb](https://www.npmjs.com/package/obj2gltf), [collada2glb](https://github.com/KhronosGroup/COLLADA2GLTF)).
Pokemon data is gathered from [pokemondb](https://pokemondb.net/pokedex/all).

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

## Setup

#### App

```bash
git clone https://github.com/Nalhin/PokemonTeams
cd app
npm install
npm run start
```

#### Backend

```bash
git clone https://github.com/Nalhin/PokemonTeams
cd server && npm install
cd ../data && import_into_local_mongodb.bat
cd ../server && npm run start
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
