#!/bin/bash

echo "Preparing the environment"
rm -rf ./out
rm -rf ./build

echo "Building the application"
npm install
npm run make

file=$(find ./out/make -type f -name "*.zip") > /dev/null

if [ "$file" ]; then
  # echo "Found: $file"
  mkdir -p ./build
  cp -r $file ./build/
  unzip -o ./build/*.zip -d ./build/ > /dev/null
  rm -rf ./build/*.zip
  rm -rf ./out

  echo ""
  echo -e "Completed, grab your application from the \033[1m\033[92mbuild\033[0m folder."
  exit 0
fi

echo ""
echo "Failed to build the application :("
exit 1
