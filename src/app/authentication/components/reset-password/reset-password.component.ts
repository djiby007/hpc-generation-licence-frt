import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ResetModel} from '../../models/reset.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  error = '';
  hide = true;
  submitted = false;
  verif = false;
  token = '';
  messageVerif = '';
  messageVerifOld = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.resetForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }
    );
  }

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;
    this.verif = this.verifyConformPassword(this.password.value, this.confirmPassword.value);
    if (this.verif) {
      this.messageVerifOld = '';
      this.messageVerif = 'Les mots de passe ne sont pas conformes';
      return;
    }

    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    let reset: ResetModel;
    reset = this.resetForm.value;
    reset.token = this.token;
    this.authService.resetPassword(reset).subscribe(
      (data) => {
        this.router.navigate(['login']);
      },
      (error) => {
        this.messageVerif = '';
        this.messageVerifOld = 'Ce lien a expiré. Veuillez renvoyer la demande de réinitialisation !';
      }
    );
  }

  setError(control: AbstractControl) {
    return {'is-invalid': control.invalid && control.touched};
  }

  verifyConformPassword(password: string, confirmPassword: string): boolean{
    if (password !== confirmPassword){
      return true;
    }else{
      return false;
    }
  }
}
