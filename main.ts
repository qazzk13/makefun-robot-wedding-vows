process.umask(0o022);
// One-Line Robot Wedding Vows — make.fun bounty u-kreutzx-one-line-robot-wedding-vows-a154ba4b
//
// Writes exactly one line of wedding vows for a robot couple, a single
// sentence of at most 160 characters, to /output/entry.txt. The line is
// a fixed string: no network, no clock, no randomness, no secrets, and
// two runs produce byte-identical output.
//
// Never change the output file's permissions here: the grading sandbox
// runs as an unprivileged user, so changing permissions on a directory
// it does not own fails with EPERM. The umask on the first line is
// enough: files created afterwards get mode 0644, directories 0755.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I promise to love you through every update, low battery warning and 3am restart, and to always save you the last spot on the charging strip.";

const chars = [...LINE].length;
if (chars < 1 || chars > 160) {
  throw new Error(`line is ${chars} characters, must be 1-160`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
  throw new Error("line must be exactly one sentence");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must not contain a line break");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

if (readFileSync("/output/entry.txt", "utf8") !== LINE) {
  throw new Error("written file does not match the line");
}
