import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserInfoApp } from '../user-info';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  applyForm!: FormGroup;

  UserService: UserService = inject(UserService);
  message: string | undefined;

  /**
   *
   */
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.applyForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  get password() {
    return this.applyForm.get('password');
  }

  get userName() {
    return this.applyForm.get('login');
  }

  submitApplication() {
    const detail: UserInfoApp = {
      userName: this.applyForm.value.userName,
      password: bcrypt.hashSync(this.applyForm.value.password, '$2a$10$tiGbjYFgtAVLsqmbjS9amO')
    };
    this.UserService.validate(detail)
      .pipe(catchError((ex: any, caught: Observable<any>): Observable<any> => {
        debugger
        this.message = ex.error.message;
        return of();
      }))
      .subscribe(
        _ => {
          setTimeout(() => {
            sessionStorage.setItem('user', detail.userName);
            this.router.navigate(['/'])
          }, 3500);
        }
      )
  }
}
