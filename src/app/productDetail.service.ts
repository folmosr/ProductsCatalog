import { Injectable } from '@angular/core';
import { ProductDetail } from './productDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './messageService';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

  submitApplication(id: number | undefined, detail: ProductDetail): Observable<MessageService> {
    if (id) {
      return this.http.put<MessageService>(`${this.url}${id}`, detail);
    } else {
      return this.http.post<MessageService>(`${this.url}`, detail);
    }
  }

  constructor(private http: HttpClient) { }

  url = 'http://localhost:7000/api/products/';

  getAllProducts(): Observable<ProductDetail[]> {
    return this.http.get<ProductDetail[]>(this.url);
  }

  getProductById(id: number): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.url}${id}`);
  }

  deleteProduct(id: number) {
    return this.http.delete<MessageService>(`${this.url}${id}`);
  }
}
