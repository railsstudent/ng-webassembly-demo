import { Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-first-nprimes',
  standalone: true,
  imports: [FormsModule],
  template: `
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
  `,
  styles: `
    .bottom-margin {
      margin-bottom: 0.5rem;
    }

    .first-n-prime-numbers {
      display: flex;
      flex-wrap: wrap;
    }
  `
})
export class FindFirstNPrimesComponent {
  @Input({ required: true })
  instance!: any;

  firstN = signal(0);

  firstNPrimeNumbers = computed(() => {
    const value = this.firstN();
    if (this.instance) {
      const { findFirstNPrimes, __getArray: getArray } = this.instance;
      return getArray(findFirstNPrimes(value));
    }

    return [];
  });

}
