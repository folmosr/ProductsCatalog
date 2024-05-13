import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../productDetail';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="productDetail.image?? '/assets/No-Image-Placeholder.svg'" alt="Exterior photo of {{productDetail.title}}">
      <h3 class="listing-heading">{{ productDetail.title.length > 25 ? productDetail.title.substring(0,25) + '...' : productDetail.title}}</h3>
      <h4 class="listing-heading">{{ productDetail.handle }}</h4>
      <h6 class="listing-heading"  [innerHTML]="productDetail.description.length > 200 ? productDetail.description.substring(0,200) + '...' : productDetail.description"></h6>
      <span class="listing-info"><label>SKU:</label> {{ productDetail.SKU}}</span>
      <span class="listing-info"><label>Barcode:</label>{{ productDetail.barcode}}</span>
      <span class="listing-info"><label>Grams:</label>{{ productDetail.grams}}</span>
      <span class="listing-info"><label>Price:</label>{{ productDetail.price}}</span>
      <span class="listing-info"><label>Compared Price:</label>{{ productDetail.compare_price}}</span>
      <div style="text-align:right;padding:0 15px 0 0;">
        <a [routerLink]="['/details', productDetail.id]"> Ir a detalle </a>
      </div>
    </section>
    
  `,
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  @Input() productDetail!: ProductDetail;

}
