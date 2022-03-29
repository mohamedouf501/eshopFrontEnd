import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { usersService, User } from '@esohp/users';
import * as countriesLib from "i18n-iso-countries"
  declare const require: (arg0: string) => countriesLib.LocaleData ;
@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: []
})
export class UsersFormComponent implements OnInit {
  isSubmitted = false;
  editMode = false;
  currentUserID!: string;
  countries :any = []
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false),
    street: new FormControl(''),
    apartment: new FormControl(''),
    zip: new FormControl(''),
    city: new FormControl(''),
    country: new FormControl('')
  });
  constructor(
    private _usersService: usersService,
    private _MessageService: MessageService,
    private _Location: Location,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
    this._GetCountries()
  }
  private _checkEditMode() {
    this._ActivatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.currentUserID = params['id'];
        this._usersService.getUser(params['id']).subscribe((res) => {
          this.form.patchValue({
            isAdmin: res.isAdmin,
            name: res.name,
            email: res.email,
            phone: res.phone,
            city: res.city,
            country: res.country,
            street: res.street,
            zip: res.zip,
            apartment: res.apartment,
          });
          this.form.get('password').clearValidators();
          this.form.get('password').updateValueAndValidity()
        });
      }
    });
  }
  onSubmit() {
    console.log(this.form.controls)
    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user : User = {
      id: this.currentUserID,
      isAdmin: this.form.get('isAdmin').value,
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      phone: this.form.get('phone').value,
      password: this.form.get('password').value,
      city: this.form.get('city').value,
      country: this.form.get('country').value,
      street: this.form.get('street').value,
      zip: this.form.get('zip').value,
      apartment: this.form.get('apartment').value,
    };
    if (this.editMode) {
         this._updateuser(user);
    } else {
      this._addUser(user);
    }
  }
  private _updateuser(User: User) {
    console.log(User);
    
    this._usersService.updateUser(User).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'user is Update' });
        timer(2000).subscribe(() => this._Location.back());
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }
  private _addUser(User: User) {
    this._usersService.createUser(User).subscribe({
      next: () => {
        this._MessageService.add({ severity: 'success', summary: 'success', detail: 'user is Created' });
        timer(2000).subscribe(() => this._Location.back());
      },
      error: (err) => {
        this._MessageService.add({ severity: 'error', summary: 'Error', detail: err.message });
      }
    });
  }

  _GetCountries()
  {
    this.countries = this._usersService.getCountries();
  }
  onCancle() {
    this._Location.back();
  }
}
