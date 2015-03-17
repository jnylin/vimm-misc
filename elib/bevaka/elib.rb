#!/usr/bin/env ruby
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

require 'fileutils'

elib, monitor = ARGV
tmp_monitor = "tmp_" + monitor
new_books = Array.new

# Windows och Excel pratar ISO-8859-1
f_elib = File.open(elib, "r:ISO-8859-1")
f_monitor = File.open(monitor, "r:ISO-8859-1")

### Gå igenom bevakade titlar
f_monitor.each_line do |whish|
	whish_to_compare = whish.strip[/^.+[^;;$]/] #Cleeves, Ann;Dött vatten;;

	f_elib.each_line do |elib_record|
		arr = elib_record.split(";")
		author = arr[3].to_s
		title = arr[1].to_s
		type = arr[2].to_s
		title_to_compare = author + ";" + title
		title_to_compare.strip!
		
		if whish_to_compare == title_to_compare
			new_books.push(title_to_compare + ";" + type)
			break
		end
	end

	f_elib.rewind

end

f_elib.close
###

### Skriv ut titlarna som HTML
f_html_new_books = File.open("nya.html","w")

f_html_new_books.print "<!DOCTYPE html><html><head><title>Nya e-b&ouml;cker att l&auml;gga in</title></head><body>"
f_html_new_books.print "<h1>Nya e-b&ouml;cker att l&auml;gga in</h1>"
f_html_new_books.print "<ul>"
new_books.each do |title|
	record = title.split(";")
	f_html_new_books.print "<li>#{record[0]}, #{record[1]} (#{record[2]})</li>"
end
f_html_new_books.print "</ul></body></html>"

f_html_new_books.close
###

### Ta bort dem från bevakningen
puts "Tar bort hittade titlar från bevakningen"
f_tmp_monitor = File.open(tmp_monitor,"w:ISO-8859-1")
f_monitor.rewind

f_monitor.each_line do |whish|
	hit = false

	new_books.each do |title|
		record = title.split(";")
		new_book = "#{record[0]};#{record[1]}".strip
		
		if whish.strip[/^.+[^;;$]/] == new_book
			hit = true
		end

	end

	if hit == false
		f_tmp_monitor.puts whish
	end
end

f_monitor.close
f_tmp_monitor.close

#FileUtils.rm(monitor)
FileUtils.mv(tmp_monitor,monitor)








