// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  return a + b;
}

// This exports a 32-bit integer constant
export const ANSWER_TO_LIFE_UNIVERSE_AND_EVERYTHING: i8 = 42;
