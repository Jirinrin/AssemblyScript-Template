import * as fs from "fs";
import * as loader from "@assemblyscript/loader";

export const wasm = loader.instantiateSync(fs.readFileSync(__dirname + "/build/optimized.wasm"), { /* imports */ });

export { getWasmBrowser } from "./get-wasm-browser";