import { Exports } from "assemblyscript-loader";
import * as ASModule from "./assembly/index";

type ASModuleType = typeof ASModule;

type ASModuleBrowserType = {
  [key in keyof ASModuleType]: ASModuleType[key] extends ((...args?: any) => any) ? typeof ASModule[key] : WebAssembly.Global;
}

export type WasmExportsBrowser = ASModuleBrowserType & WebAssembly.Exports;

export type WasmExports = ASModuleType & Exports;