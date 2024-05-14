import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  notification:string = '';
  route: ActivatedRoute = inject(ActivatedRoute);
  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailId = -1;
  productDetail:ProductDetail | undefined;
  applyForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(50)
    ]),
    handle: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ]),
    SKU: new FormControl('',
    [
      Validators.required,
      Validators.minLength(12)
    ]
    ),
    barcode: new FormControl('',[
      Validators.required,
      Validators.minLength(12)
    ]),
    stock: new FormControl(0,[
      Validators.required
    ]),
    grams: new FormControl(0, [
      Validators.required,
    ]),
    price: new FormControl(0, [
      Validators.required,
      Validators.min(1)
    ]),
    compare_price: new FormControl(0, [
      Validators.required,
      Validators.min(1)
    ]),
    image: new FormControl('', [Validators.pattern(this.reg)]),
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

  get title() {
    return this.applyForm.get('title');
  }

  get description() {
    return this.applyForm.get('description');
  }

  get stock() {
    return this.applyForm.get('stock');
  }

  get price() {
    return this.applyForm.get('price');
  }

  get compare_price() {
    return this.applyForm.get('compare_price');
  }

  get grams() {
    return this.applyForm.get('grams');
  }

  get SKU() {
    return this.applyForm.get('SKU');
  }
  
  get barcode() {
    return this.applyForm.get('barcode');
  }

  get image() {
    return this.applyForm.get('image');
  }

  get handle() {
    return this.applyForm.get('handle');
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
