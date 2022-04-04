import { ASModule } from "./wasm/exports";
import { initWasmBrowser } from "./wasm/init-wasm";

(async () => {
  // Instantiate our wasm module
  const wasmModule = await initWasmBrowser<ASModule>("./wasm/release.wasm");
  const moduleExports = wasmModule.instance.exports;

  // Call the Add function export from wasm, save the result
  const addResult = moduleExports.add(24, 24);

  const magicNumber = moduleExports.ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING.valueOf();

  // Set the result onto the body
  document.body.innerHTML = `Hello World! addResult: ${addResult} <br/> The magic number of today is: ${magicNumber}`;
})();
