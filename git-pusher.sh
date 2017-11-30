#!/usr/bin/env bash

#cp -r ../stock-exchange-server-side/node_modules/rotating-file-stream/ ./node_modules/

git add -A; git commit -m "$*"; git push github master; git push gitlab master
