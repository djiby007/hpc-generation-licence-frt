import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import {UserModel} from '../../../user/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  error = false;
  loading = false;
  submitted = false;
  userModel: UserModel;
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService){
    // redirect to home if already logged in
    if (this.authService.currentUser) {
      this.router.navigate(['home']);
    }
  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  get username(){
    return this.loginForm.get('username');
  }

  get password(){
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const auth: AuthModel = {login: this.username.value, password: this.password.value};
    // auth = this.loginForm.value;
    this.authService.login(auth).subscribe(
      (data) => {
        // this.getDetailsUser(this.username.value);
        this.router.navigate(['home']);
      },
      (error) => {
        this.error = true;
        // this.loading = false;
      }
    );
  }

  getDetailsUser(username: string){
    this.authService.getUser(username).subscribe(user => this.userModel = user);

    /*.subscribe(
      (data) => {
        this.userModel = data;
        // localStorage.setItem('currentUser', JSON.stringify(this.userModel));
        this.currentUserSubject.next(this.userModel);
      });*/
  }
  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }
}
