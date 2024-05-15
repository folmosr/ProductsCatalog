import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductComponent, RouterModule, HttpClientModule],
  template: `
  <main class="container-fluid">
    <a [routerLink]="['/']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
      </header>
    </a>
    <div class="row">
      <router-outlet></router-outlet>
    </div>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Products';
}
