#!/bin/sh
# Copyright 2015 Jakob Nylin (jakob [dot] nylin [at] gmail [dot] com)
# All rights reserved.
#
# Redistribution and use of this script, with or without modification, is
# permitted provided that the following conditions are met:
#
# 1. Redistributions of this script must retain the above copyright
# notice, this list of conditions and the following disclaimer.
#
# THIS SOFTWARE IS PROVIDED BY THE AUTHOR ''AS IS'' AND ANY EXPRESS OR IMPLIED
# WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
# EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
# SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
# PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
# OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
# WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
# OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
# ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

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