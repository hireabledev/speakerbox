#!/bin/bash

rm -rf src/public/ build/

mkdir -p src/public

$(dirname "$0")/babel.sh
$(dirname "$0")/webpack.sh

cp -R src/public build/
cp src/lib/webpack.stats.json build/lib/webpack.stats.json
