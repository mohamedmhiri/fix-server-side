#!/bin/sh
for var in $*
do
	touch ./lib/services/$var.js
	touch ./lib/models/$var.js
	touch ./lib/routes/$var.js
	touch ./lib/controllers/$var.js
	git add -A
	git commit -m "$var added"
	git push github master; git push gitlab master
done