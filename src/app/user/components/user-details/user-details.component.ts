import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Location} from '@angular/common';
import {UserModel} from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: UserModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private location: Location) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail(){
    this.userService.findUserByUsername(localStorage.getItem('username'))
      .subscribe((data) => {
        this.user = data;
      });
  }

  goBack() {
    this.location.back();
  }

}
