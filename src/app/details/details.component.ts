import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';



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
  productDetail: ProductDetail | undefined;


  bottonModal: string = "Delete";
  titleModal: string = "Confirm";
  contentModal!: string;

  ngOnInit() {
    this.contentModal = `Are you sure to delete the product ${this.productDetail?.title}`;
    this.productDetailId = Number(this.route.snapshot.params['id']);
    this.productDetailService.getProductById(this.productDetailId)
      .then(detail => {
        this.productDetail = detail;
      });
  }



}
