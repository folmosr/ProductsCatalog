import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInfoApp } from './user-info';
import { MessageService } from './messageService';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:5000/api/users/';

  validate(userInfo: UserInfoApp): Observable<MessageService> {
    return this.http.post<MessageService>(this.url, userInfo);
  }

}
