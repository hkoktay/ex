# ex - archive extractor


## Background

This is just a small example program to try out typescript with nodejs. Also I
just can't remember the command line arguments for file archive programs.
Currently this program has not much practical value because you can get the
same result with command aliases in your favorite shell. If I find the time I
will extend this little program to be more useful.


## Summary

ex is a small command line programm to extract the contents of an archive file to
the current directory. It looks at the file ending and calls a program to extract
the contents of the archive.

    Usage
    
    ex             -  display documentation
    ex -h          -  display help
    ex -l          -  list supported archive files
    ex -v          -  show version number
    ex -u <file>   -  unpack archive file


## Additional Information

There is not yet a configuration file but size of the source code is so small
that you can easily modify or extend it. There is also an additional developer
README, 'README-dev.md', which documents the source code.
