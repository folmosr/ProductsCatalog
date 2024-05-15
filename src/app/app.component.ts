import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
  <main class="container-fluid">
      <header class="brand-name">
        <div class="row">
          <div class="col-6">
            <a [routerLink]="['/']">
              <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true">
            </a>
          </div>
          <div class="col-6 text-end" style="display:inline" *ngIf="active">
            <a [routerLink]="['/add-new']" class="btn btn-primary">Add new</a>
          </div>
        </div>
      </header>
    <div class="row">
      <router-outlet></router-outlet>
    </div>
  </main>
`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Products';
  active: boolean = false;

  /**
   *
   */
  constructor(private router: Router) {


  }
  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
    } else {
      this.active = true;
    }
  }
}
