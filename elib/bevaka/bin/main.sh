#!/bin/sh
ELIB=${ELIB:-elib.csv}
MONITOR=${MONITOR:-bevakade.csv}
RESULT=${RESULT:-nya.html}

./elib.rb $ELIB $MONITOR && xdg-open ../$RESULT 
