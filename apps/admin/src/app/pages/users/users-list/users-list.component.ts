import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { User, usersService } from '@esohp/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: []
})
export class UsersListComponent implements OnInit {
  Users: User[] = [];
  constructor(
    private _usersService: usersService,
    private _MessageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  deleteUser(UserID: string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want Delete this User?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._usersService.deleteUser(UserID).subscribe({
          next: (res) => {
            this._getUsers();
          },
          error: (err) => {
            this._MessageService.add({ severity: 'error', summary: 'Error', detail: 'User cannot Deleted' });
          },
          complete: () => {
            this._MessageService.add({ severity: 'success', summary: 'success', detail: 'User is Deleted' });
          }
        });
      },
      reject: () => {
        this._MessageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
      }
    });
  }

  getCountryName(countryKey: string) {
    if (countryKey) {
      return this._usersService.getCountry(countryKey);
    } else {
      return 'No Country';
    }
  }

  private _getUsers() {
    this._usersService.getUsers().subscribe({
      next: (res) => {
        this.Users = res;
      }
    });
  }
}
