import { Injectable } from '@angular/core';
import { ProductDetail } from './productDetail';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  async submitApplication(id: number, detail: ProductDetail) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(detail)
    };
    const data = await fetch(`${this.url}${id}`, requestOptions);
    return await data.json() ?? [];
  }

  constructor() { }

  url = 'http://localhost:8000/api/products/';

  async getAllProducts(): Promise<ProductDetail[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getProductById(id:number): Promise<ProductDetail> {
    const data = await fetch(`${this.url}${id}`);
    return await data.json() ?? [];
  }
  
}
