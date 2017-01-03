#!/bin/bash

NODE_ENV=test nyc --reporter=lcov --reporter=text mocha --compilers js:babel-register test/index.js "src/**/*.spec.js"
