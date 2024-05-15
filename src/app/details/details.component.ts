import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationMessage } from '../notificationMessage';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormComponent, ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailId = -1;
  productDetail: ProductDetail | null = null;
  productDetail$: Observable<ProductDetail | null> | undefined;

  bottonModal: string = "Delete";
  titleModal: string = "Confirm";
  contentModal!: string;

  ngOnInit() {
    this.contentModal = `Are you sure to delete this product`;
    this.productDetailId = Number(this.route.snapshot.params['id']);
    this.productDetail$ = this.productDetailService.getProductById(this.productDetailId);
    this.productDetail$.subscribe(data => this.productDetail = data)

  }

  receiveNotification(notification: any) {
    console.log('por aqui no');
    console.log(notification);
  }

}
