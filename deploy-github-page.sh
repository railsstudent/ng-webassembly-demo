#!/bin/sh

echo "delete docs"
rm -rf docs
echo "build project starts"
ng build --output-path docs/
cp -r ./docs/browser/index.html  ./docs/browser/404.html
cp -r ./docs/browser/*  ./docs
rm -rf ./docs/browser
echo 'build project finishes'
