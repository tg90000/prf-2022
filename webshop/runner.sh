#!/bin/sh

node -r express_api/dotenv/config express_api/index.js
cd webshop
ng serve