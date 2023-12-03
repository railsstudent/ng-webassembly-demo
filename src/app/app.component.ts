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
      <p>isPrime(101): {{ isPrimeNumber() }}</p>

      @for(primeNumber of primeNumbers(); track primeNumber) {
        <p>Prime number: {{ primeNumber }}</p>
      }
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  instance!: any;
  isPrimeNumber = signal(false);
  primeNumbers = signal<number[]>([])

  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');
  }

  async ngOnInit(): Promise<void> {
    this.instance = await loader.instantiateStreaming(fetch('../assets/release.wasm'), { 
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
      });

    const { exports } = this.instance;
    console.log(exports);

    const { isPrime, findFirstNPrimes, __getArray: getArray } = exports;

    this.isPrimeNumber.set(isPrime(81) === 1);

    const primeNumberResults = getArray(findFirstNPrimes(5));
    this.primeNumbers.set(primeNumberResults);
  }
}
