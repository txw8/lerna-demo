#! /bin/sh
mkdir temp_web
npm run deploy:build
cd temp_web
git clone --depth 1 -b gh-pages --single-branch https://github.com/YuwpUI/yuwp-ui.git && cd yuwp-ui

# build sub folder
SUB_FOLDER='1.4'
mkdir $SUB_FOLDER
rm -rf *.js *.css *.map static
rm -rf $SUB_FOLDER/**
cp -rf ../../examples/yuwp-ui/** .
cp -rf ../../examples/yuwp-ui/** $SUB_FOLDER/
cd ../..

# deploy domestic site
faas deploy alpha
rm -rf temp_web