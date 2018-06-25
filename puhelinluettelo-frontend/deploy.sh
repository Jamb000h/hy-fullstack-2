#!/bin/sh
npm run build
rm -rf ../../hy-fullstack-3/build
cp -r build ../../hy-fullstack-3/