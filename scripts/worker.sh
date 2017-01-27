#!/bin/bash

if [[ $NODE_ENV == 'production' ]];
then
  node build/worker/index.js
else
  nodemon --config .nodemon --exec 'BABEL_ENV=server babel-node -- src/worker/index.js'
fi
