import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { UserService } from '../services/user.service';
import { UserCustom } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users$: Observable<UserCustom[]>;

  constructor(private userService : UserService) {
    this.users$ = this.userService.getUsers() as Observable<UserCustom[]>;
  }

  ngOnInit(): void {
  }

}
