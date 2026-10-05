// test_trans.mjs — 提取翻译纯函数并 Node 断言。
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import assert from "node:assert";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(join(here, "index.html"), "utf-8");
const m = html.match(/\/\/ ===== 纯函数：词典翻译[\s\S]*?\/\/ ===== TRANS_LOGIC_END =====/);
assert.ok(m, "未找到翻译纯函数标记");
const f = new Function(`${m[0]}\nreturn { translate };`)();

assert.strictEqual(f.translate("i love apple"), "我 爱 苹果");
assert.strictEqual(f.translate("hello world"), "你好 世界");
assert.strictEqual(f.translate("我"), "I");
// 未命中词保留
assert.ok(f.translate("apple zebra").includes("zebra"));

console.log("OK: translator-web-lite 全部用例通过");