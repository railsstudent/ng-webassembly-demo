import { Injectable } from '@angular/core';
import loader, { Imports } from '@assemblyscript/loader';

const DEFAULT_IMPORTS: Imports = { 
  env: {
    abort: function() {
      throw new Error('Abort called from wasm file');
    },
  },
  index: {
    primeNumberLog: function(primeNumber: number) {
      console.log(`primeNumberLog: ${primeNumber}`);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class WebAssemblyLoaderService {
  async streamWasm(wasm: string, imports = DEFAULT_IMPORTS): Promise<any> {
    if (!loader.instantiateStreaming) {
      return this.wasmFallback(wasm, imports);
    }

    const { exports } = await loader.instantiateStreaming(fetch(wasm), imports);
    return exports;
  }

  async wasmFallback(wasm: string, imports: Imports) {
    console.log('using fallback');
    const response = await fetch(wasm);
    const bytes = await response?.arrayBuffer();
    const { instance } = await loader.instantiate(bytes, imports);

    return instance?.exports;
}
}
