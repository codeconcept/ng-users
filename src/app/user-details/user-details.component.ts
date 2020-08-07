import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
import {switchMap} from 'rxjs/operators';

import { User } from 'firebase';
import { UserCustom } from '../models/user';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnDestroy {
  user?: UserCustom;
  uid = '';
  sub: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.sub = this.activatedRoute
    .params
    .pipe(
      switchMap(params => {
        console.log('params', params);
        this.uid =params.id;
        return this.userService.getUser(this.uid)
      })
    )
    .subscribe(user => {
      this.user = user;
      this.user.createdAt = (this.user?.createdAt as any).toDate();
    }, err => {
      console.error(err);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
