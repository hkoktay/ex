# Developer README

This file will give you overview about the source code, what tools
I used and a reference of the functions, procedures and variables
in the source code. This documentation is not really necessary for
such a small project; nevertheless it is a good habit.

## Overview

ex is written in [typescript](https://www.typescriptlang.org/), so
the code is split into two directories: *src* and *dist*. The *src*
directory contains the typescript files and the *dist* directory
contains the transpiled javascript files. Tests are in the test file
*tests/ex-lib.js*.

The ex source repository consists of only five files. The entry point
is the file *index.ts*. The *index.ts* file is also the command line
interface. You can find all procedures used by *index.ts* in the file
*ex.ts*. The *ex.ts* modul depends on the functions in the file
*ex-lib.ts*. I split ex into two files to make testing easier. The
functions in *ex-lib.ts* are side-effect free, while the procedures in
*ex.ts* have side-effects. The tests - in *tests/ex-lib.js* currently
cover only the functions in the file *ex-lib.ts*.

## Tools

The only tools used are typescript, [node-tap](https://www.node-tap.org/)
for testing and [tslint](https://palantir.github.io/tslint/) as the linter
for the ts files.

## Testing

Currently there are only tests for the *ex-lib.ts* file. More specifically
for the file *dist/ex-lib.js* transpiled by typescript. This program should
have more tests but hasn't because it is not production code; it is just a
small program to learn typescript. I chose node-tap for testing because it
is simple to use. Also I didn't need browser support.

## Reference

The reference is split into three parts: procedures, functions and variables.
Procedures are functions with side-effects. You may also find the
documentation for [commander.js](https://github.com/tj/commander.js/) and
[nodejs](https://nodejs.org/dist/latest-v8.x/docs/api/) useful.

### Procedures

`displayDoc = (): void`

Displays the documentation string of the file *src/doc.ts* to standard output.

`displayCommands = (): void`

Displays the extensions and commands used to unpack archive file for these
extensions. It uses the variable *extensionMap* which is a Map data structure
with a file extension as key and the command as value. For example ".tar" is
the key and "tar xf" is the value bound to the key.

`unpackArchive = (string): void`

Takes a file string as an argument, which should be file archive, and unpacks
the archive to the current directory. The current directory is determined by
nodejs with *process.cwd()*. This procedures uses two helper procedures:
*mapCommandToFile* and *execAllCommands*. The first procedures creates an
array of shell command string, which are executed synchronously by
*execAllCommands*.

`execAllCommands = (string[]): void`

Takes an array of strings as an argument, which represent shell command strings,
and iterates over the array and applying the procedure *execCommand* to the
command strings in the array. If supplied array is empty, execAllCommands
displays the message "I don't know how to unpack this file." to stdout.

`execCommand = (string): void`

Takes an command string as an argument and executes the command with nodejs'
procedure: execSync with the options `{ shell: "/usr/bin/bash", cwd: process.cwd() }`

### Functions

`mapCommandToFile = (string, ExtensionMap): string[]`

Takes two arguments, a file string and a *ExtensionMap* data structure. This
function maps the file extensions found in the file string to the appropriate
shell commands in the variable *extensionMap*.

Example:

    mapCommandToFile("file.tar.gz", extensionMap)

    => ["gunzip file.tar.gz", "tar xf file.tar"]

`isValidExtension = (string): boolean`

Takes a string as an argument and returns *false* if the supplied string is
"" or "."; returns *true* otherwise.

`findCommand = (string, ExtensionMap): string | false`

Takes a string and an ExtensionMap as arguments. It searches for the file
extension string in the supplied ExtensionMap. If it finds the string it
returns the command string; otherwise it returns false.

Example:

    findCommand(".tar", extensionMap)

    => "tar xf"

    findCommand(".tar.gz", extensionMap)

    => false

### Variables

`extensionMap: Map<string, string>`

This variable stores a map data structure with strings as its keys and
strings as its values. Its created with:

    new Map(
      [
        [".tar", "tar xf"],
        [".tgz", "tar zxvf"],
        [".xz", "unxz"],
        [".gz", "gunzip"],
        [".rar", "unrar e"],
        [".zip", "unzip"],
        [".bz2", "bunzip2"],
        [".lz", "lzip -c -q -d"],
        [".7z", "7z x"],
      ]);
    