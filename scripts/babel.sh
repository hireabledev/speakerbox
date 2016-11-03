#!/bin/bash

# TODO: frontend vs backend

babel src -d ./build -s --copy-files --ignore node_modules --ignore src/public
