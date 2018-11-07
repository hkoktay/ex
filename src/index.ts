#!/usr/bin/env node

import cli from "commander";
import { displayCommands, displayDoc, unpackArchive } from "./ex";

cli
  .version("0.3.0")
  .usage("[options] <file>")
  .option("-l, --list", "list supported file formats with available commands", displayCommands)
  .option("-u, --unpack [file]", "unpack archive file in current directory", unpackArchive)
  .option("-d, --doc", "display documentation for ex", displayDoc)
  .parse(process.argv);

// Display help message if there are no arguments
if (process.argv.slice(2).length < 1) {
  displayDoc();
}
