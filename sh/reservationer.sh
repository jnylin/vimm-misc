#!/bin/sh
grep "Vimmerby - HB" $1 | iconv -f iso-8859-1 -t utf-8 | awk '\
	BEGIN {
		FS = ";"
		print "<!DOCTYPE html><html><head><meta charset=\"UTF-8\" /><title>Reservationer infångade i automat</title><style>th { text-align: left; } td, th { padding: 3px 7px 2px 7px; }</style></head><body><table>"
		print "<tr><th>Låntagare</th><th>Hämtställe</th><th>Titel</th><th>Reservationsdatum</th></tr>"
	}
	{
		print "<tr><td>"$3"</td><td>"$5"</td><td>"$2"</td><td>"$6"</td></tr>" 
	} 
	END {
		print "</table></body></html>"
	}'