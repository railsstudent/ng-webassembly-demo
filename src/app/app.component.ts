import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import loader from '@assemblyscript/loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="container outer">
      <h2>Angular + WebAssembly Demo</h2>
      <form>
        <label for="primeNumber">
          <span>Input an positive integer: </span>
          <input id="primeNumber" name="primeNumber" type="number"
            [ngModel]="primeNumber()" (ngModelChange)="primeNumber.set($event)" />
        </label>
      </form>

      <p style="margin-bottom: 0.5rem;">isPrime({{ primeNumber() }}): {{ isPrimeNumber() }}</p>

      <form style="margin-bottom: 0.5rem;">
        <label for="firstNPrimeNumbers">
          <span>Find first N prime numbers: </span>
          <input id="firstNPrimeNumbers" name="firstNPrimeNumbers" type="number"
            [ngModel]="firstN()" (ngModelChange)="firstN.set($event)" />
        </label>
      </form>

      <p style="margin-bottom: 0.5rem;">First {{ firstN() }} prime numbers:</p>
      <div class="container first-n-prime-numbers">
        @for(primeNumber of firstNPrimeNumbers(); track primeNumber) {
          <span class="prime-number">{{ primeNumber }}</span>
        }
      <div>
    </div>
  `,
  styles: [`
    div.outer {
      margin: 0.5rem;
    }

    .first-n-prime-numbers {
      display: flex;
      flex-wrap: wrap;
    }

    .prime-number {
      padding: 0.25rem;
    }
  `],
})
export class AppComponent implements OnInit {
  instance!: any;
  primeNumber = signal(0);
  firstN = signal(0);

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
      }).then(({ exports }) => exports);

    console.log(this.instance);
  }
}
