import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
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
      <p>isPrime(11): {{ isPrimeResult() }}</p>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {

  webAssemblyExports!: Promise<WebAssembly.Exports>;
  isPrimeResult = signal([]);

  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');

    // console.log('webAssemblyExports', this.webAssemblyExports);
  }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');

    this.webAssemblyExports = WebAssembly.instantiateStreaming(fetch('../assets/release.wasm'), { env: {
      abort: function(msg: string) {
        throw new Error(msg || 'Abort called from wasm file');
      },
      "console.log": console.log
    } })
    .then((obj) => { 
      console.log('obj', obj);
      return obj.instance.exports;
    });

    this.webAssemblyExports.then((obj) => {
      const results = (obj as any).findFirstNPrimes(5);
      this.isPrimeResult.set(results);
    })
  }
}
