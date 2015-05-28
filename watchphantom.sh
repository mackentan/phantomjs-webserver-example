#!/bin/sh

count=`ps -e|grep phantom|wc -l`

if [ $count = 0 ]; then
	echo "not running"
	#nohup /usr/bin/phantomjs /macken/phantomjsserver/server.js > /macken/phlog &
	/usr/bin/phantomjs /macken/phantomjsserver/server.js > /macken/phlog &
else
	echo "running"
fi
