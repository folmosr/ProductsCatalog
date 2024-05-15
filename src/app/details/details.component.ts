import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailService } from '../productDetail.service';
import { ProductDetail } from '../productDetail';
import { ModalComponent } from '../modal/modal.component';
import { FormComponent } from '../form/form.component';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationMessage } from '../notificationMessage';
import { catchError, of } from 'rxjs';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormComponent, ModalComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  @ViewChild(ModalComponent) modal?: ModalComponent;

  route: ActivatedRoute = inject(ActivatedRoute);
  productDetailService: ProductDetailService = inject(ProductDetailService);
  productDetailId = -1;
  productDetail: ProductDetail | null = null;
  productDetail$: Observable<ProductDetail | null> | undefined;

  /**
   *
   */
  constructor(private router: Router) {
  }

  ngOnInit() {
    this.productDetailId = Number(this.route.snapshot.params['id']);
    this.productDetail$ = this.productDetailService.getProductById(this.productDetailId);
    this.productDetail$.subscribe(data => this.productDetail = data)

  }

  receiveNotification(notification: NotificationMessage) {
    if (this.modal) {
      let content: string;
      this.modal.title = 'Update action';
      if (notification.type == 'OK') {
        content = `<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Product has been updated successfully.${notification.message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        this.refreshContent();
      } else {
        content = `<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> ${notification.message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
      }
      this.modal.content = content;
      this.modal.open();
    }
  }

  refreshContent() {
    this.productDetail$ = this.productDetailService.getProductById(this.productDetailId);
    this.productDetail$.subscribe(data => this.productDetail = data)
  }

  confirmDelete() {
    if (this.modal) {
      this.modal.title = 'Delete';
      this.modal.content = `Are you sure to delete ${this.productDetail?.title} ?`;
      this.modal.activeActionButton = true;
      this.modal.actionButtonTitle = 'Delete';
      this.modal.actionButtonCallback = this.deleteProduct;
      this.modal.open();
    }
  }

  deleteProduct = () => {
    this.productDetailService.deleteProduct(this.productDetailId)
      .pipe(catchError((ex: any, caught: Observable<any>): Observable<any> => {
        this.sendNewNotification(ex.error.message, 'Error');
        return of();
      }))
      .subscribe(
        data => this.sendNewNotification(data.message, 'OK')
      )
  }

  sendNewNotification(message: string, type: string) {
    if (this.modal) {
      let content;
      if (type == 'OK') {
        content = `<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Product has been deleted successfully.${message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        setTimeout(() => {
          this.modal?.close();
          this.router.navigate(['/'])
        }, 3500);
      } else {
        content = `<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> ${message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
      }
      this.modal.title = 'Delete action';
      this.modal.content = content;
      this.modal.activeActionButton = false;
      this.modal.open();

    }

  }

}
