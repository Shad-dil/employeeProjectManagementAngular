import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ToastrModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate(300),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: '',
  };

  http = inject(HttpClient);
  router = inject(Router);
  toast: ToastrService;
  constructor(toast: ToastrService) {
    this.toast = toast;
  }
  onLogin(form: any) {
    this.http
      .post(
        'https://projectapi.gerasim.in/api/EmployeeManagement/login',
        this.loginObj
      )
      .subscribe((res: any) => {
        if (res.result) {
          localStorage.setItem('employeeApp', JSON.stringify(res.data));
          this.router.navigateByUrl('/dashboard');
          this.toast.success('Login Successful');
        } else {
          this.toast.error('Invalid Username or Password');
        }
      });
    form.reset();
  }
}
