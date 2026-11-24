// Funniest Autocorrect Fail — u-zeroxfive-funniest-autocorrect-fail-ddf82154
// Writes one original autocorrect-fail line (gate: 1-199 characters,
// single line, not only whitespace) to $MAKEFUN_OUTPUT_DIR/entry.txt.
// Deterministic: same bytes on every run. Node 22, stdlib only, offline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  'I texted my wife "I love you so much" — autocorrect sent "I love you so mulch" and now she thinks I\'m having an affair with the gardener.';

// The gate, checked before writing: 1 to 199 characters, one line, real text.
if (LINE.length < 1 || LINE.length > 199 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`entry line fails the gate: ${LINE.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
const outFile = join(outDir, "entry.txt");
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE + "\n", "utf8");
// Read back what was written: the file must hold exactly the line plus newline.
if (readFileSync(outFile, "utf8") !== LINE + "\n") {
  throw new Error("entry.txt does not match the entry line");
}
console.log(`wrote ${LINE.length} characters to ${outFile}`);
