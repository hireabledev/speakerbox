#!/bin/bash

if [[ $NODE_ENV == 'production' ]];
then
  node build/index.js
else
  BABEL_ENV=development nodemon --config .nodemon --exec babel-node -- src/index.js
fi
