const documentation =  `

    ex - the simple archive extractor
    --------------------------------------------------------------------

    This is a small command line program to unpack archives files. It 
    looks at the file ending of the archive file and executes the 
    apropriate program installed on your system.

    If you use ex on a tar file for example:

      ex -u file.tar

    This would execute the command *tar xf file.tar* and thus unpack all
    files from file.tar into the current directory.


    Options
    ---------------------------------------------------------------------

    There are five command line options:

      -d, --doc
      -h, --help
      -l, --list
      -u, --unpack
      -v, --version

    Here is the documentation of the options:
    
    -d, --doc

    Display documentation to stdout. You can get additional help
    with the command line option '-h'.

    -h, --help

    Display the help message to stdout. The help message lists all command
    line options with a small description what they do.

    -l, --list

    This option display all supported file extensions and the mapped
    commands to stdout.

    -u       <file>
    --unpack <file>

    This option takes a file as an argument. If the file is a supported
    file extension and a program for this file extension is installed
    on your computer, ex unpacks the archive into the currend directory.

    -v, --version

    Displays the current verions of ex to stdout.

`;

export default documentation;
