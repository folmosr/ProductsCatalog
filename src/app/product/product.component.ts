import { Component, inject } from '@angular/core';
import { ProductDetailService } from '../productDetail.service';
import { CommonModule } from '@angular/common';
import { ProductDetail } from '../productDetail';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailList$!: Observable<ProductDetail[]>;


  /**
   *
   */
  ngOnInit() {
    this.productDetailList$ = this.productDetailService.getAllProducts();
  }

}
