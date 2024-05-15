import { Component, ViewChild } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { ModalComponent } from '../modal/modal.component';
import { NotificationMessage } from '../notificationMessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [FormComponent, ModalComponent],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {

  @ViewChild(ModalComponent) modal?: ModalComponent;

  /**
   *
   */
  constructor(private router: Router) {

  }

  ngOnInit() {
    if (!sessionStorage.getItem('user')) {
      this.router.navigate(['login']);
    }
  }

  receiveNotification(notification: NotificationMessage) {
    if (this.modal) {
      let content: string;
      this.modal.title = 'Update action';
      if (notification.type == 'OK') {
        content = `<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Product has been created successfully.${notification.message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
        setTimeout(() => {
          this.modal?.close();
          this.router.navigate(['/'])
        }, 3500);
      } else {
        content = `<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> ${notification.message}.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
      }
      this.modal.content = content;
      this.modal.open();
    }
  }

}
