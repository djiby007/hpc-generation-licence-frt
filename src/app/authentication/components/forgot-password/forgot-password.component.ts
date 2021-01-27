import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ForgotPasswordModel} from '../../models/forgot-password.model';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  submitted = false;
  error = false;
  url: string;
  hasMessage = false;
  hasError = false;
  message = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService){
  }

  ngOnInit(): void {
    this.createForm();
  }

  OnClose() {
    this.router.navigateByUrl('login');
  }

  createForm(){
    this.forgotForm = new FormGroup({
      email: new FormControl('', Validators.required)
    });
  }
  get email(){
    return this.forgotForm.get('email');
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    let forgot: ForgotPasswordModel;
    forgot = this.forgotForm.value;
    // @ts-ignore
    forgot.url = environment.frontUrl + '/reset-password';
    this.authService.forgotPassword(forgot).subscribe(
      (data) => {
        this.createForm();
        if (data.success === false){
          this.hasError = true;
          this.hasMessage = false;
          this.message = data.message;
        }else {
          this.hasMessage = true;
          this.hasError = false;
          this.message = data.message;
        }
      },
      (error) => {
        this.error = true;
        // this.loading = false;
      }
    );
  }

  setError(control: AbstractControl){
    return {'is-invalid': control.invalid && control.touched};
  }
}
