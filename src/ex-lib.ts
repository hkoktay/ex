import { parse } from "path";

export type ExtensionMap = Map<string, string>;

export let extensionMap: ExtensionMap = new Map(
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

export let findCommand = (name: string, cm: ExtensionMap): string | false => {
  const result: string = cm.get(name);
  if (result === undefined) {
    return false;
  } else {
    return result;
  }
};

export let isValidExtension = (str: string): boolean => {
  if (str === "" || str === ".") {
    return false;
  } else {
    return true;
  }
};

export let mapCommandToFile = (file: string, cm: ExtensionMap): string[] | [] => {
  const { ext, name } = parse(file);

  const result: string[] = [];
  for (let e = ext, n = name, f = file; isValidExtension(e);) {
    const cmd = findCommand(e, cm);
    const cmdAndFile = cmd + " " + f;
    result.push(cmdAndFile);
    const next = parse(n);
    f = n;
    e = next.ext;
    n = next.name;
  }
  return result;
};
