const tap = require("tap");
const exLib = require("../dist/ex-lib.js");

tap.equal(exLib.findCommand(".tar", exLib.extensionMap), "tar xf");
tap.equal(exLib.findCommand(".tar.gz", exLib.extensionMap), false);
tap.equal(exLib.findCommand(".gz", exLib.extensionMap), "gunzip");
tap.equal(exLib.findCommand(".", exLib.extensionMap), false);
tap.equal(exLib.findCommand("", exLib.extensionMap), false);
tap.equal(exLib.findCommand(3, exLib.extensionMap), false);

tap.equal(exLib.isValidExtension(".gz"), true);
tap.equal(exLib.isValidExtension(".tar.gz"), true);
tap.equal(exLib.isValidExtension("."), false);
tap.equal(exLib.isValidExtension(""), false);
tap.equal(exLib.isValidExtension("test"), true);

tap.same(exLib.mapCommandToFile("file.tar", exLib.extensionMap),
                                ["tar xf file.tar"]);
tap.same(exLib.mapCommandToFile("file.tar.gz", exLib.extensionMap),
                                ["gunzip file.tar.gz", "tar xf file.tar"]);
tap.same(exLib.mapCommandToFile("file.gz.tar.gz", exLib.extensionMap),
                                ["gunzip file.gz.tar.gz",
                                 "tar xf file.gz.tar",
                                  "gunzip file.gz"]);
tap.same(exLib.mapCommandToFile("file.", exLib.extensionMap), []);
tap.same(exLib.mapCommandToFile("file", exLib.extensionMap), []);
tap.same(exLib.mapCommandToFile(".file", exLib.extensionMap), []);
tap.same(exLib.mapCommandToFile("./file/", exLib.extensionMap), []);
