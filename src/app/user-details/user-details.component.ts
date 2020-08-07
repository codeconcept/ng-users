import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable, Subscription } from 'rxjs';
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
    this.sub = this.activatedRoute.paramMap
    .subscribe(params => {
      this.uid = params.get('id') || '';
      console.log('uid', this.uid);   
      this.userService
        .getUser(this.uid)
        .subscribe((data: UserCustom) => {
          this.user = data;
          this.user.createdAt = (data.createdAt as any).toDate();
      }, err => {
        console.error(err);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
