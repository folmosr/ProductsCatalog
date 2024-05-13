import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
      <article>
          <span>{{notification}}</span>
          <img class="listing-photo" [src]="productDetail?.image ?? '/assets/No-Image-Placeholder.svg'" alt="Exterior photo of {{productDetail?.title}}" />
          <section class="listing-description">
            <p class="listing-location" [innerHTML]="productDetail?.description"></p>
          </section>
          <section class="listing-features">
            <ul>
              <li>Title: {{productDetail?.title}}</li>
              <li>Handle: {{productDetail?.handle}}</li>
              <li>SKU: {{productDetail?.SKU}}</li>
              <li>Barcode: {{productDetail?.barcode}}</li>
              <li>Stock: {{productDetail?.stock}}</li>
              <li>Grams: {{productDetail?.grams}}</li>
              <li>Price: {{productDetail?.price}}</li>
              <li>Compare Price: {{productDetail?.compare_price}}</li>
            </ul>
          </section>
          <section class="listing-apply">
            <h2 class="section-heading">Update Product</h2>
            <form [formGroup]="applyForm" (submit)="submitApplication()">
              <label for="title">Title</label>
              <input id="title" type="text" formControlName="title"  />
              <label for="SKU">SKU</label>
              <input id="SKU" type="text" formControlName="SKU"  />
              <label for="barcode">Barcode</label>
              <input id="barcode" type="text" formControlName="barcode"  />
              <label for="description">Description</label>
              <textarea id="description" formControlName="description"  style="width: 419px; height: 156px;"></textarea>
              <label for="hanlde">Hanlde</label>
              <input id="handle" type="text" formControlName="handle"  />
              <label for="price">Price</label>
              <input id="price" type="number" formControlName="price"  />
              <label for="compare_price">Compare Price</label>
              <input id="compare_price" type="number" formControlName="compare_price"  />
              <label for="stock">Stock</label>
              <input id="image" type="text" formControlName="stock"  />
              <label for="image">URL for Image</label>
              <input id="image" type="text" formControlName="image"  />
              <button type="submit" class="primary">Update</button>
            </form>
          </section>
      </article>`
  ,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  notification:string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailId = -1;
  productDetail:ProductDetail | undefined;
  applyForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    handle: new FormControl(''),
    SKU: new FormControl(''),
    barcode: new FormControl(''),
    stock: new FormControl(0),
    grams: new FormControl(0),
    price: new FormControl(0),
    compare_price: new FormControl(0),
    image: new FormControl(''),
  });

  constructor() {
      this.productDetailId = Number(this.route.snapshot.params['id']);
      this.productDetailService.getProductById(this.productDetailId)
      .then(detail => {
        this.productDetail = detail;
        this.applyForm.setValue({
          title :  this.productDetail .title,
          description :  this.productDetail.description,
          stock :  this.productDetail.stock,
          price :  this.productDetail.price,
          compare_price :  this.productDetail.compare_price,
          grams :  this.productDetail.grams,
          SKU :  this.productDetail.SKU,
          barcode :  this.productDetail.barcode,
          image :  this.productDetail.image,
          handle :  this.productDetail.handle,
        })
      });
  }

  submitApplication() {
    const detail:ProductDetail = {
      id : this.productDetail?.id!,
      title :  this.applyForm.value.title ?? '',
      description :  this.applyForm.value.description ?? '',
      stock :  this.applyForm.value.stock ?? 0,
      price :  this.applyForm.value.price ?? 0,
      compare_price :  this.applyForm.value.compare_price ?? 0,
      grams :  this.applyForm.value.grams ?? 0,
      SKU :  this.applyForm.value.SKU ?? '',
      barcode :  this.applyForm.value.barcode ?? '',
      image :  this.applyForm.value.image ?? '',
      handle :  this.applyForm.value.handle ?? '',
    }
    this.productDetailService.submitApplication(this.productDetailId, detail)
    .then(r => this.notification = r.message)
    .catch((e:Error) => this.notification = e.message);
  }
}
