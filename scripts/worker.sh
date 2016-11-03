#!/bin/bash

if [[ $NODE_ENV == 'production' ]];
then
  node build/worker/index.js
else
  nodemon --config .nodemon --exec babel-node --no-babelrc --plugins transform-es2015-modules-commonjs,transform-runtime --presets stage-3,react -- src/worker/index.js
fi
