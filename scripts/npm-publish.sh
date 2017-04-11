#!/usr/bin/env bash

touch .npmignore
echo '//registry.npmjs.org/:_authToken=${NPM_TOKEN}' > .npmrc
npm publish build