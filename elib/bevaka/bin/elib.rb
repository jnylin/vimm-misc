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

class Ebook
	def initialize(options = {})
		@author = options[:author]
		@title = options[:title]
		@type = options[:type] || nil
	end

	def to_compare
		"#{@author}".strip + ";" + "#{@title}".strip
	end

	def get_author
		@author
	end

	def get_title
		@title
	end

	def get_type
		@type
	end
	
end

elib, monitor = ARGV
path_base = File.expand_path("../")
path_csv = File.expand_path("../csv/")
tmp_monitor = "tmp_" + monitor
new_books = Array.new

# Windows och Excel pratar ISO-8859-1
f_elib = File.open("#{path_csv}/#{elib}", "r:ISO-8859-1")
f_monitor = File.open("#{path_csv}/#{monitor}", "r:ISO-8859-1")

### Gå igenom bevakade titlar
f_monitor.each_line do |w|
	arr = w.split(";")
	whish = Ebook.new(:author=>arr[0],:title=>arr[1])

	f_elib.each_line do |e|
		arr = e.split(";")
		elib_record = Ebook.new(:author=>arr[3],:title=>arr[1],:type=>arr[2])

		if whish.to_compare == elib_record.to_compare
			new_books.push(elib_record)
			break
		end
	end

	f_elib.rewind

end

f_elib.close
###

### Skriv ut titlarna som HTML
f_html_new_books = File.open("#{path_base}/nya.html","w")

f_html_new_books.print "<!DOCTYPE html><html><head><title>Nya e-b&ouml;cker att l&auml;gga in</title></head><body>"
f_html_new_books.print "<h1>Nya e-b&ouml;cker att l&auml;gga in</h1>"
f_html_new_books.print "<ul>"
new_books.each do |b|
	f_html_new_books.print "<li>#{b.get_author}, #{b.get_title} (#{b.get_type})</li>"
end
f_html_new_books.print "</ul></body></html>"

f_html_new_books.close
###

### Ta bort dem från bevakningen
f_tmp_monitor = File.open("#{path_csv}/#{tmp_monitor}","w:ISO-8859-1")
f_monitor.rewind

f_monitor.each_line do |w|
	hit = false
	arr = w.split(";")
	whish = Ebook.new(:author=>arr[0],:title=>arr[1])

	new_books.each do |b|
		
		if whish.to_compare == b.to_compare
			hit = true
		end

	end

	if hit == false
		f_tmp_monitor.puts whish.to_compare
	end
end

f_monitor.close
f_tmp_monitor.close

FileUtils.mv("#{path_csv}/#{tmp_monitor}","#{path_csv}/#{monitor}")








