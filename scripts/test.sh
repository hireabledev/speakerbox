#!/bin/bash

mocha --compilers js:babel-register test/index.js test/**/*.test.js src/**/*.test.js
