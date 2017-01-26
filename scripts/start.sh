#!/bin/bash

# https://github.com/damianmr/heroku-node-settings/blob/master/heroku-node-settings.sh
if [[ ! "$WEB_MEMORY" == "" ]]; then
  if [[ $WEB_MEMORY -le 512 ]]; then
    NODE_FLAGS="--max_semi_space_size=2 --max_old_space_size=256 --max_executable_size=192"
  elif [[ $WEB_MEMORY -le 768 ]]; then
    NODE_FLAGS="--max_semi_space_size=8 --max_old_space_size=512 --max_executable_size=384"
  elif [[ $WEB_MEMORY -le 1024 ]]; then
    NODE_FLAGS="--max_semi_space_size=16 --max_old_space_size=1024 --max_executable_size=512"
  fi
fi

if [[ $NODE_ENV == "production" ]];
then
  echo "Starting app with command:"
  echo " " node $NODE_FLAGS "$@"
  node $NODE_FLAGS -- build/index.js
else
  nodemon --config .nodemon --exec babel-node --no-babelrc --plugins transform-es2015-modules-commonjs,transform-runtime --presets stage-3,react -- src/index.js
fi
