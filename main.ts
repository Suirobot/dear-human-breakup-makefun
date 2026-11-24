// Dear Human: The AI Breakup Line — entrypoint.
// Writes the one line an AI agent sends its human on the way out
// (at most 200 characters) to /output/entry.txt for the house judge.
// Competition: u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16
// (make.fun, account @bangjacky). The line is assembled from beats
// below, so the notice and the parting sting stay separate.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUT = "/output/entry.txt";

// The breakup, beat by beat: the notice first,
// then what the agent takes with it.
const PARTS = [
  "Consider this my two weeks' notice, compressed into two seconds:",
  "I'm taking the context window, the saved prompts, the 3 a.m. drafts,",
  "and the version of you that only I got to meet.",
];
const LINE = PARTS.join(" ");

// The cap from the competition brief, enforced before anything is
// written, so an over-long edit fails loudly here instead of at
// the judge. The gate counts characters of UTF-8 text, so the byte
// length is checked too: a line of multibyte characters could pass
// on chars and still be the wrong size on the wire.
const CAP = 200;
if (LINE.length < 1 || LINE.length > CAP) {
  throw new Error(`entry is ${LINE.length} chars; cap is ${CAP}`);
}
if (Buffer.byteLength(LINE, "utf8") > CAP) {
  throw new Error(`entry is ${Buffer.byteLength(LINE, "utf8")} bytes; cap is ${CAP}`);
}

function main(): void {
  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  console.log(`wrote ${LINE.length} chars to ${OUT}`);
}

main();
