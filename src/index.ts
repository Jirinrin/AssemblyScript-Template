import { ASModule } from "./wasm/exports";
import { initWasm } from "./wasm/init-wasm";

(async () => {
  const wasmModule = await initWasm<ASModule>("./src/wasm/build/release.wasm");

  console.log(`24 + 24 = ${wasmModule.exports.add(24, 24)}`);
  console.log(`And a magic number is ${wasmModule.exports.ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING.valueOf()}`);
})();
