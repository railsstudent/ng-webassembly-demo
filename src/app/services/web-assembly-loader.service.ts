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
  streamWasm(wasm: string, imports = DEFAULT_IMPORTS): Promise<any> {
    return loader.instantiateStreaming(fetch(wasm), imports).then(({ exports }) => exports);
  }
}
