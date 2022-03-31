import { AuthService } from './../../service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  isSubmited = false;
  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  });
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}
  Submit() {
    if (this.form.invalid) {
      this.isSubmited = true;
      return;
    }
    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this._AuthService.login(email, password).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
