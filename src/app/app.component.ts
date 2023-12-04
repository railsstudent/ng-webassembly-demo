import { APP_BASE_HREF } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import loader from '@assemblyscript/loader';

export const getFullAssetPath = (assetName: string) => {
  const baseHref = inject(APP_BASE_HREF);
  const isEndWithSlash = baseHref.endsWith('/');
  return `${baseHref}${isEndWithSlash ? '' : '/'}assets/${assetName}`;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container outer" style="margin: 0.5rem;">
      <h2>Angular + WebAssembly Demo</h2>
      <form>
        <label for="primeNumber">
          <span>Input an positive integer: </span>
          <input id="primeNumber" name="primeNumber" type="number"
            [ngModel]="primeNumber()" (ngModelChange)="primeNumber.set($event)" />
        </label>
      </form>

      <p class="bottom-margin">isPrime({{ primeNumber() }}): {{ isPrimeNumber() }}</p>

      <form>
        <label for="firstNPrimeNumbers">
          <span>Find first N prime numbers: </span>
          <input id="firstNPrimeNumbers" name="firstNPrimeNumbers" type="number"
            [ngModel]="firstN()" (ngModelChange)="firstN.set($event)" />
        </label>
      </form>

      <p class="bottom-margin">First {{ firstN() }} prime numbers:</p>
      <div class="container first-n-prime-numbers">
        @for(primeNumber of firstNPrimeNumbers(); track primeNumber) {
          <span style="padding: 0.25rem;">{{ primeNumber }}</span>
        }
      <div>
    </div>
  `,
  styles: [`
    .first-n-prime-numbers {
      display: flex;
      flex-wrap: wrap;
    }

    .bottom-margin {
      margin-bottom: 0.5rem;
    }
  `],
})
export class AppComponent implements OnInit {
  instance!: any;
  primeNumber = signal(0);
  firstN = signal(0);
  releaseWasm = getFullAssetPath('release.wasm');

  isPrimeNumber = computed(() => { 
    const value = this.primeNumber();
    return this.instance ? this.instance.isPrime(value) === 1 : false
  });

  firstNPrimeNumbers = computed(() => {
    const value = this.firstN();
    if (this.instance) {
      const { findFirstNPrimes, __getArray: getArray } = this.instance;
      return getArray(findFirstNPrimes(value));
    }
    return [];
  });

  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');
  }

  async ngOnInit(): Promise<void> {
    this.instance = await loader.instantiateStreaming(fetch(this.releaseWasm), { 
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
      }).then(({ exports }) => exports);

    console.log(this.instance);
  }
}
