import { Injectable } from '@angular/core';
import { ProductDetail } from './productDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  submitApplication(id: number, detail: ProductDetail): Observable<MessageService> {
    return this.http.put<MessageService>(`${this.url}${id}`, detail);
  }

  constructor(private http: HttpClient) { }

  url = 'http://localhost:7000/api/products/';

  async getAllProducts(): Promise<ProductDetail[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  getProductById(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.url}${id}`);
  }

}
