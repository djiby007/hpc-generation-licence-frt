import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../user/models/user.model";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser: UserModel;
  constructor() { }

  ngOnInit(): void {
  }

}
