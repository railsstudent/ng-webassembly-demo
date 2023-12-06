import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-optimized-sieve',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form>
      <label for="primeNumber">
        <span>Input an positive integer: </span>
        <input id="primeNumber" name="primeNumber" type="number"
          [ngModel]="lessThanNumber()" (ngModelChange)="lessThanNumber.set($event)" />
      </label>
    </form>

    <p class="bottom-margin">Prime numbers less than {{ lessThanNumber() }}</p>
    <div class="container prime-numbers-less-than-n bottom-margin">
      @for(primeNumber of primeNumbers(); track primeNumber) {
        <span style="padding: 0.25rem;">{{ primeNumber }}</span>
      }
    <div>
  `,
  styles: `
  .prime-numbers-less-than-n {
      display: flex;
      flex-wrap: wrap;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptimizedSieveComponent {
  @Input({ required: true })
  instance!: any;

  lessThanNumber = signal(0);
  
  primeNumbers = computed(() => { 
    const value = this.lessThanNumber();
    if (this.instance) {
      const { optimizedSieve, __getArray: getArray } = this.instance;
      return getArray(optimizedSieve(value));
    }

    return [];
  });
}
