import { ChangeDetectionStrategy, Component, Input, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-is-prime',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form>
      <label for="primeNumber">
        <span>Input an positive integer: </span>
        <input id="primeNumber" name="primeNumber" type="number"
          [ngModel]="primeNumber()" (ngModelChange)="primeNumber.set($event)" />
      </label>
    </form>
    <p class="bottom-margin">isPrime({{ primeNumber() }}): {{ isPrimeNumber() }}</p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IsPrimeComponent {
  @Input({ required: true })
  instance!: any;

  primeNumber = signal(0);
  
  isPrimeNumber = computed(() => { 
    const value = this.primeNumber();
    return this.instance ? this.instance.isPrime(value) === 1 : false
  });
}
