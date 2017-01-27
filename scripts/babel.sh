#!/bin/bash

NODE_ENV=production BABEL_ENV=server babel src -d ./build -s --copy-files
