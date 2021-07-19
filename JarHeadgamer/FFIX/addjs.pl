#!/usr/bin/perl

open(FILE,"<htmlfiles");
@htmlfiles = <FILE>;
close(FILE);

foreach $file (@htmlfiles) {
    chomp($file);
    open(FILE,"<$file");
    @data = <FILE>;
    close(FILE);

    open(FILE,">$file");
    foreach $line (@data) {

       $line =~ s/\<HEAD\>/\<HEAD\>\<SCRIPT LANGUAGE=JAVASCRIPT SRC=\/js\/chss.js\>\<\/SCRIPT\>/i;
       print FILE $line;
    }
    close(FILE);
}


