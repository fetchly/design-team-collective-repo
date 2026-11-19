import { test } from "node:test";
import assert from "node:assert";
import { score, filterDiff } from "./check.mjs";
const r = (s) => ({ status: s });
test("ratio uses applicable laws only", () => {
  const s = score([r("violated"), r("violated"), r("violated"), r("pass"), r("not_applicable")]);
  assert.deepStrictEqual(s, { applicable: 4, violated: 3, ratio: 0.75 });
});
test("exactly 75% does not block, above does", () => {
  assert.ok(!(score([r("violated"), r("violated"), r("violated"), r("pass")]).ratio > 0.75));
  assert.ok(score([r("violated"), r("violated"), r("violated"), r("violated"), r("pass")]).ratio > 0.75);
});
test("no applicable laws scores 0", () => assert.strictEqual(score([r("not_applicable")]).ratio, 0));
test("diff filter keeps UI files, drops lockfiles and backend", () => {
  const d = "diff --git a/a.liquid b/a.liquid\n+x\ndiff --git a/package-lock.json b/package-lock.json\n+y\ndiff --git a/srv.py b/srv.py\n+z\n";
  const f = filterDiff(d);
  assert.match(f, /a\.liquid/); assert.doesNotMatch(f, /lock|srv/);
});
