import { AuthService } from '@esohp/users';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}

  ngOnInit(): void {}
  logout() {
    this._AuthService.logOut();
  }
}
