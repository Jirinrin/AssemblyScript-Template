# AssemblyScript simple template repo

### To get this working:
- `npm i`
- `npm run asbuild`
- For browser demo:
  - `npm serve`
  - Go to http://localhost:1234
- For NodeJS demo:
  - `npm start`
- Everything works!(?)

### Significant files:
- `src/wasm/assembly/index.ts`: the actual AssemblyScript file
- `src/wasm/build/optimized.wasm` / `src/wasm/build/untouched.wasm`: the binary files (optimized and non-optimized) built from the AssemblyScript that need to be initialised somewhere in your code.
- `src/wasm/exports.d.ts`: util file that makes sure the TypeScript definitions of exports from your WASM module work well
- `src/index-browser.ts`: the script that is run from the browser
- `src/index.ts`: the script that is run from NodeJS

### Other useful links:
- https://docs.assemblyscript.org/quick-start
- https://wasmbyexample.dev/