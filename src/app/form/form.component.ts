import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDetail } from '../productDetail';
import { ProductDetailService } from '../productDetail.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() productDetail: ProductDetail | undefined;

  @Input() productDetailId: number = -1;

  notification: string = '';

  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  applyForm!: FormGroup;

  productDetailService: ProductDetailService = inject(ProductDetailService);

  ngOnInit() {

    this.applyForm = new FormGroup({
      title: new FormControl(this.productDetail?.title ?? '', [
        Validators.required,
        Validators.minLength(4)
      ]),
      description: new FormControl(this.productDetail?.description ?? '', [
        Validators.required,
        Validators.minLength(50)
      ]),
      handle: new FormControl(this.productDetail?.handle ?? '', [
        Validators.required,
        Validators.minLength(4)
      ]),
      SKU: new FormControl(this.productDetail?.SKU ?? '',
        [
          Validators.required,
          Validators.minLength(12)
        ]
      ),
      barcode: new FormControl(this.productDetail?.barcode ?? '', [
        Validators.required,
        Validators.minLength(12)
      ]),
      stock: new FormControl(this.productDetail?.stock ?? 0, [
        Validators.required
      ]),
      grams: new FormControl(this.productDetail?.grams ?? 0, [
        Validators.required,
      ]),
      price: new FormControl(this.productDetail?.price ?? 0, [
        Validators.required,
        Validators.min(1)
      ]),
      compare_price: new FormControl(this.productDetail?.compare_price ?? 0, [
        Validators.required,
        Validators.min(1)
      ]),
      image: new FormControl(this.productDetail?.image ?? '', [Validators.pattern(this.reg)]),
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
    const detail: ProductDetail = {
      id: this.productDetail?.id!,
      title: this.applyForm.value.title ?? '',
      description: this.applyForm.value.description ?? '',
      stock: this.applyForm.value.stock ?? 0,
      price: this.applyForm.value.price ?? 0,
      compare_price: this.applyForm.value.compare_price ?? 0,
      grams: this.applyForm.value.grams ?? 0,
      SKU: this.applyForm.value.SKU ?? '',
      barcode: this.applyForm.value.barcode ?? '',
      image: this.applyForm.value.image ?? '',
      handle: this.applyForm.value.handle ?? '',
    }
    this.productDetailService.submitApplication(this.productDetailId, detail)
      .then(r => this.notification = r.message)
      .catch((e: Error) => this.notification = e.message);
  }
}
