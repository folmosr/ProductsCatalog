import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductDetail } from '../productDetail';
import { ProductDetailService } from '../productDetail.service';
import { CommonModule } from '@angular/common';
import { NotificationMessage } from '../notificationMessage';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  @Input() productDetail: ProductDetail | null = null;

  @Input() productDetailId: number | undefined;

  @Output() notificationEvent = new EventEmitter<NotificationMessage>();

  reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

  applyForm!: FormGroup;

  productDetailService: ProductDetailService = inject(ProductDetailService);

  ngOnInit() {
    this.applyForm = new FormGroup({
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
      barcode: new FormControl('', [
        Validators.required,
        Validators.minLength(12)
      ]),
      stock: new FormControl(0, [
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

  }

  ngOnChanges() {
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

  sendNewNotification(message: string, type: string) {
    this.notificationEvent.emit({
      message,
      type
    });
  }

  submitApplication() {
    const detail: ProductDetail = {
      id: this.productDetail?.id!,
      title: this.applyForm.value.title,
      description: this.applyForm.value.description,
      stock: this.applyForm.value.stock,
      price: this.applyForm.value.price,
      compare_price: this.applyForm.value.compare_price,
      grams: this.applyForm.value.grams,
      SKU: this.applyForm.value.SKU,
      barcode: this.applyForm.value.barcode,
      image: this.applyForm.value.image,
      handle: this.applyForm.value.handle,
    }
    this.productDetailService.submitApplication(this.productDetailId, detail)
      .pipe(catchError((ex: any, caught: Observable<any>): Observable<any> => {
        this.sendNewNotification(ex.error.message, 'Error');
        return of();
      }))
      .subscribe(
        data => this.sendNewNotification(data.message, 'OK')
      )

  }
}
