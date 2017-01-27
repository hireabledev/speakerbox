#!/bin/bash

if [[ $NODE_ENV == 'production' ]];
then
  node --optimize_for_size --max_old_space_size=460 --gc_interval=100 build/index.js
else
  BABEL_ENV=development nodemon --config .nodemon --exec babel-node -- src/index.js
fi
