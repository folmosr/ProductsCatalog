import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { NewProductComponent } from './new-product/new-product.component';

const routeConfig: Routes = [
  {
    path: '',
    component: ProductComponent,
    title: 'Home page'
  },
  {
    path: 'add-new',
    component: NewProductComponent,
    title: 'Add new'
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Product details'
  }
];

export default routeConfig;