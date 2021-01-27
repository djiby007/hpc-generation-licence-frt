import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../user/models/user.model";
import {HttpParams} from "@angular/common/http";
import {AuthService} from "../../authentication/services/auth.service";
import {Router} from "@angular/router";
import {PermissionService} from "../../permission/services/permission.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: UserModel;
  constructor(private authService: AuthService,
  private router: Router,
  private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.authService.getUser(localStorage.getItem('username')).subscribe(value => {
        this.currentUser = value;
      }
    );
  }


  logout(): void{
    this.authService.logout().subscribe(
      (data) => {
        this.router.navigateByUrl('/login');
      }
    );
  }

}
