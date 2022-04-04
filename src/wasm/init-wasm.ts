import { Imports } from "@assemblyscript/loader";

type WASMModule<RawModule extends Record<string, unknown>> = {
  [K in keyof RawModule]: RawModule[K] extends ((...args: any[]) => any) ? RawModule[K] : WebAssembly.Global;
}

const defaultImportObject: WebAssembly.Imports & Imports = { env: { abort: () => console.log("Abort!") } };

export async function initWasm<TModule extends Record<string, unknown>>(wasmModulePath: string, importObject: Imports = defaultImportObject) {
  const [loader, fs] = await Promise.all([import("@assemblyscript/loader"), import("fs")]);
  return loader.instantiate<WASMModule<TModule>>(fs.readFileSync(wasmModulePath), { imports: importObject });
}

// https://github.com/torch2424/wasm-by-example/blob/master/demo-util/
export async function initWasmBrowser<TModule extends Record<string, unknown>>(wasmModuleUrl: string, importObject: WebAssembly.Imports = defaultImportObject) {
  let response: WebAssembly.WebAssemblyInstantiatedSource;

  // Check if the browser supports streaming instantiation
  if (WebAssembly.instantiateStreaming) {
    // Fetch the module, and instantiate it as it is downloading
    response = await WebAssembly.instantiateStreaming(
      fetch(wasmModuleUrl),
      importObject
    );
  } else {
    // Fallback to using fetch to download the entire module
    // And then instantiate the module
    const fetchAndInstantiateTask = async () => {
      const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
        response.arrayBuffer()
      );
      return WebAssembly.instantiate(wasmArrayBuffer, importObject);
    };
    response = await fetchAndInstantiateTask();
  }

  return response as WebAssembly.WebAssemblyInstantiatedSource & {instance: {exports: WASMModule<TModule>}};
};
