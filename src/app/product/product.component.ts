import { Component, inject } from '@angular/core';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../productDetail';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductDetailComponent
  ],
  template: `
    <section>
    <form>
      <input type="text" placeholder="Filter by city">
      <button class="primary" type="button">Search</button>
    </form>
  </section>
  <section class="results">
    <app-product-detail
    *ngFor="let productDetail of productDetailList; let i=index;" [productDetail]="productDetail"></app-product-detail>
  </section>
  `,
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productDetailList: ProductDetail[] = [];
  productDetailService: ProductDetailService = inject(ProductDetailService);

  /**
   *
   */
  constructor() {
    this.productDetailService.getAllProducts().then((list: ProductDetail[]) => {
      this.productDetailList = list;
    });
    
  }
}
