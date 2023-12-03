import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

// declare function isPrime(n: number): boolean;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="container">
      <h2>Angular + WebAssembly Demo</h2>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');

    console.log('WebAssembly', WebAssembly);
  }
}
