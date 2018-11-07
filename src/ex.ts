import { execSync } from "child_process";
import { extensionMap, mapCommandToFile } from "./ex-lib";

import documentation from "./doc";

const execCommand = (cmd: string): void => {
  execSync(cmd, { shell: "/usr/bin/bash", cwd: process.cwd() });
};

const execAllCommands = (commands: string[]): void => {
  const isEmptyArray = (x: any[]): boolean => {
    if (x.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  if (isEmptyArray(commands)) {
    console.log("I don't know how to unpack this file.");
  } else {
    console.log("Executing commands ...");
    try {
      commands.forEach((cmd) => {
        console.log(cmd);
        execCommand(cmd);
      });
    } catch (e) {
      console.error(e);
    }
  }
};

export const unpackArchive = (file: string): void => {
  const commandFileMap = mapCommandToFile(file, extensionMap);
  execAllCommands(commandFileMap);
};

export const displayDoc = (): void => {
  console.log(documentation);
};

export const displayCommands = (): void => {
  extensionMap.forEach((val, key) => {
    console.log(`${key} : ${val}`);
  });
};
