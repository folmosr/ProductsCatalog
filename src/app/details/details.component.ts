import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  template: `
      <article>
          <img class="listing-photo" [src]="productDetail?.image ?? '/assets/No-Image-Placeholder.svg'" alt="Exterior photo of {{productDetail?.title}}" />
          <section class="listing-description">
            <p class="listing-location" [innerHTML]="productDetail?.description"></p>
          </section>
          <section class="listing-features">
            <ul>
              <li>SKU: {{productDetail?.SKU}}</li>
              <li>Barcode: {{productDetail?.barcode}}</li>
              <li>Grams: {{productDetail?.grams}}</li>
              <li>Price: {{productDetail?.price}}</li>
              <li>Compare Price: {{productDetail?.compare_price}}</li>
            </ul>
          </section>
      </article> 
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailId = -1;
  productDetail:ProductDetail | undefined;

  constructor() {
      this.productDetailId = Number(this.route.snapshot.params['id']);
      this.productDetailService.getProductById(this.productDetailId)
      .then(detail => this.productDetail = detail);
  }
}
