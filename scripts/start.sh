#!/bin/bash

if [[ $NODE_ENV == 'production' ]];
then
  node build/index.js
else
  nodemon --config .nodemon --exec 'BABEL_ENV=server babel-node -- src/index.js'
fi
