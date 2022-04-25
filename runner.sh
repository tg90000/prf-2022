#!/bin/sh

cd express_api
node -r dotenv/config index.js &
cd ../webshop
ng serve &
cd ..

# ng build --prod