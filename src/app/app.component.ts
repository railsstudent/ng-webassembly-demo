import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import loader from '@assemblyscript/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container">
      <h2>Angular + WebAssembly Demo</h2>
      <p>isPrime(11): {{ isPrimeResult() }}</p>
      <p>primeNumbers: {{ primeNumbers() }}</p>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  webAssemblyExports!: any;
  isPrimeResult = signal(false);
  primeNumbers = signal<number[]>([])

  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');
  }

  async ngOnInit(): Promise<void> {
    this.webAssemblyExports = await loader.instantiateStreaming(fetch('../assets/release.wasm'), { 
      // env: {
        // abort: function(msg: string): never {
        //   throw new Error(msg || 'Abort called from wasm file');
        // },
        // "console.log": console.log
      // }
        module: {
          "console.log": console.log,
        },
        env: {
          abort: function() {
            throw new Error('Abort called from wasm file');
          },
          // "console.log": console.log,
          // 'console.log': (arg: number) => console.log(arg),
        },
        index: {
          primeNumberLog: function(primeNumber: number) {
            console.log(`primeNumberLog: ${primeNumber}`);
          }
        }
      });
    const a = this.webAssemblyExports.exports

    const isPrimeNumberResult = a.isPrime(97) as number;
    console.log(this.webAssemblyExports.exports);
    this.isPrimeResult.set(isPrimeNumberResult === 1);

    const firstThreePrimeNumbers = a.findFirstNPrimes(3);
    const getArray = a.__getArray;
    
    const convertedPrimeNumbers = getArray(firstThreePrimeNumbers);
    this.primeNumbers.set(convertedPrimeNumbers);
  }
}
