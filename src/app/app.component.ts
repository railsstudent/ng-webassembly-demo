import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { getFullAssetPath } from './full-asset-path';
import { FindFirstNPrimesComponent } from './prime-number/find-first-nprimes/find-first-nprimes.component';
import { IsPrimeComponent } from './prime-number/is-prime/is-prime.component';
import { WebAssemblyLoaderService } from './services/web-assembly-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, IsPrimeComponent, FindFirstNPrimesComponent],
  template: `
    <div class="container outer" style="margin: 0.5rem;">
      <h2>Angular + WebAssembly Demo</h2>
      <app-is-prime [instance]="instance" />
      <app-find-first-nprimes [instance]="instance" />
    </div>
  `,
  styles: ``,
})
export class AppComponent implements OnInit {
  instance!: any;
  releaseWasm = getFullAssetPath('release.wasm');
  wasmLoader = inject(WebAssemblyLoaderService);

  constructor(title: Title) {
    title.setTitle('Ng WebAssembly Demo');
  }

  async ngOnInit(): Promise<void> {
    this.instance = await this.wasmLoader.streamWasm(this.releaseWasm);
    console.log(this.instance);
  }
}
